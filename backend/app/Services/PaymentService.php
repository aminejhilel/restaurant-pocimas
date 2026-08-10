<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Setting;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Webhook;

class PaymentService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Create a Stripe Checkout Session.
     */
    public function createCheckoutSession(Reservation $reservation, string $successUrl, string $cancelUrl): StripeSession
    {
        $settings = Setting::first();
        $fee = $reservation->reservation_fee ?? ($settings ? $settings->reservation_fee : 3);
        $amountInCents = (int) round($fee * 100);

        return StripeSession::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount' => $amountInCents,
                    'product_data' => [
                        'name' => 'Table Reservation - Table ' . $reservation->table->table_number,
                        'description' => 'Reservation for ' . $reservation->guests . ' guests on ' . $reservation->reservation_date . ' at ' . $reservation->reservation_time,
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $successUrl . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $cancelUrl,
            'customer_email' => $reservation->customer_email,
            'metadata' => [
                'reservation_id' => $reservation->id,
            ],
        ]);
    }

    /**
     * Handle a Stripe webhook event.
     */
    public function handleWebhook(string $payload, string $signature): void
    {
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $signature, $secret);
        } catch (SignatureVerificationException $e) {
            Log::error('Stripe webhook signature verification failed: ' . $e->getMessage());
            throw $e;
        }

        match ($event->type) {
            'checkout.session.completed' => $this->handleCheckoutCompleted($event->data->object),
            'checkout.session.expired' => $this->handleCheckoutExpired($event->data->object),
            default => null,
        };
    }

    private function handleCheckoutCompleted(object $session): void
    {
        $reservationId = $session->metadata->reservation_id ?? null;
        if (!$reservationId) return;

        $reservation = Reservation::find($reservationId);
        if (!$reservation) return;

        $reservation->update([
            'payment_status' => 'paid',
            'reservation_status' => 'confirmed',
            'stripe_payment_id' => $session->payment_intent,
        ]);

        // Send confirmation email
        try {
            \Mail::to($reservation->customer_email)->send(
                new \App\Mail\ReservationConfirmed($reservation)
            );
        } catch (\Exception $e) {
            Log::error('Failed to send confirmation email: ' . $e->getMessage());
        }
    }

    private function handleCheckoutExpired(object $session): void
    {
        $reservationId = $session->metadata->reservation_id ?? null;
        if (!$reservationId) return;

        $reservation = Reservation::find($reservationId);
        if (!$reservation) return;

        $reservation->update([
            'payment_status' => 'failed',
            'reservation_status' => 'cancelled',
        ]);
    }
}
