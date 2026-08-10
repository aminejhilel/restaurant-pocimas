<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function __construct(private ReservationService $reservationService) {}

    public function store(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:restaurant_tables,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:30',
            'guests' => 'required|integer|min:1',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'special_request' => 'nullable|string|max:1000',
        ]);

        try {
            $reservation = $this->reservationService->createPendingReservation([
                ...$request->only([
                    'table_id', 'customer_name', 'customer_email', 'customer_phone',
                    'guests', 'reservation_date', 'reservation_time', 'special_request',
                ]),
                'user_id' => $request->user()?->id,
            ]);

            return response()->json([
                'message' => 'Reservation created. Please complete payment.',
                'reservation' => $reservation->load('table'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    public function myReservations(Request $request)
    {
        $reservations = Reservation::where(function ($q) use ($request) {
                if ($request->user()) {
                    $q->where('user_id', $request->user()->id)
                      ->orWhere('customer_email', $request->user()->email);
                } else {
                    $q->whereRaw('0=1');
                }
            })
            ->with('table')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reservations);
    }

    public function show(Request $request, Reservation $reservation)
    {
        // Allow access only to the owner or admin
        if ($request->user() && (
            $request->user()->id === $reservation->user_id ||
            $request->user()->email === $reservation->customer_email
        )) {
            return response()->json($reservation->load('table'));
        }

        return response()->json(['message' => 'Unauthorized.'], 403);
    }

    public function cancel(Request $request, Reservation $reservation)
    {
        if ($request->user() && (
            $request->user()->id !== $reservation->user_id &&
            $request->user()->email !== $reservation->customer_email
        )) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        try {
            $this->reservationService->cancelReservation($reservation);
            return response()->json(['message' => 'Reservation cancelled successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
