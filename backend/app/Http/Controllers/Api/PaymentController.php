<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct(private PaymentService $paymentService) {}

    /**
     * Create a Stripe Checkout Session for a pending reservation.
     */
    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
        ]);

        $reservation = Reservation::with('table')->findOrFail($request->reservation_id);

        // Ensure reservation is still pending
        if ($reservation->payment_status !== 'pending') {
            return response()->json(['message' => 'This reservation is not awaiting payment.'], 422);
        }

        try {
            $session = $this->paymentService->createCheckoutSession(
                $reservation,
                config('app.frontend_url') . '/reservation/confirmation',
                config('app.frontend_url') . '/reservation'
            );

            return response()->json([
                'checkout_url' => $session->url,
                'session_id' => $session->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Stripe checkout error: ' . $e->getMessage());
            return response()->json(['message' => 'Payment service error. Please try again.'], 500);
        }
    }

    /**
     * Handle Stripe Webhooks. Route excluded from CSRF.
     */
    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');

        if (!$signature) {
            return response()->json(['message' => 'Missing signature.'], 400);
        }

        try {
            $this->paymentService->handleWebhook($payload, $signature);
            return response()->json(['status' => 'ok']);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['message' => 'Invalid signature.'], 400);
        } catch (\Exception $e) {
            Log::error('Webhook error: ' . $e->getMessage());
            return response()->json(['message' => 'Webhook error.'], 500);
        }
    }
}
