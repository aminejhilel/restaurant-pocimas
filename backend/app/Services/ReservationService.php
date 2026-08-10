<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Setting;
use App\Services\TableAvailabilityService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservationService
{
    public function __construct(
        private TableAvailabilityService $availabilityService
    ) {}

    /**
     * Create a pending reservation (before payment).
     */
    public function createPendingReservation(array $data): Reservation
    {
        $settings = Setting::first();
        $fee = $settings ? $settings->reservation_fee : 3.00;

        return DB::transaction(function () use ($data, $fee) {
            // Final availability check with lock
            $available = $this->availabilityService->checkAvailabilityWithLock(
                $data['table_id'],
                $data['reservation_date'],
                $data['reservation_time']
            );

            if (!$available) {
                throw new \Exception('This table is no longer available. Please choose another table.');
            }

            return Reservation::create([
                'user_id' => $data['user_id'] ?? null,
                'table_id' => $data['table_id'],
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'guests' => $data['guests'],
                'reservation_date' => $data['reservation_date'],
                'reservation_time' => $data['reservation_time'],
                'special_request' => $data['special_request'] ?? null,
                'reservation_fee' => $fee,
                'payment_status' => 'paid',
                'reservation_status' => 'confirmed',
            ]);
        });
    }

    /**
     * Cancel a reservation.
     */
    public function cancelReservation(Reservation $reservation, bool $isAdmin = false): void
    {
        if (!$isAdmin && $reservation->payment_status === 'paid') {
            // Only allow cancellation if reservation is not too soon
            $reservationDateTime = \Carbon\Carbon::parse(
                $reservation->reservation_date . ' ' . $reservation->reservation_time
            );
            if ($reservationDateTime->diffInHours(now()) < 24) {
                throw new \Exception('Reservations cannot be cancelled less than 24 hours before the reserved time.');
            }
        }

        $reservation->update([
            'reservation_status' => 'cancelled',
        ]);

        try {
            \Mail::to($reservation->customer_email)->send(
                new \App\Mail\ReservationCancelled($reservation)
            );
        } catch (\Exception $e) {
            Log::error('Failed to send cancellation email: ' . $e->getMessage());
        }
    }
}
