<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\RestaurantTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TableAvailabilityService
{
    /**
     * Get all active tables with availability status for a given date/time.
     */
    public function getTablesWithAvailability(string $date, string $time, int $guests): array
    {
        $tables = RestaurantTable::where('status', true)->get();

        return $tables->map(function ($table) use ($date, $time, $guests) {
            $isReserved = $this->isTableReserved($table->id, $date, $time);
            return [
                'id' => $table->id,
                'table_number' => $table->table_number,
                'capacity' => $table->capacity,
                'shape' => $table->shape,
                'position_x' => $table->position_x,
                'position_y' => $table->position_y,
                'availability_status' => $isReserved ? 'reserved' : 'available',
                'suitable' => $table->capacity >= $guests,
            ];
        })->toArray();
    }

    /**
     * Check if a specific table is reserved for a given date/time.
     */
    public function isTableReserved(int $tableId, string $date, string $time): bool
    {
        return Reservation::where('table_id', $tableId)
            ->where('reservation_date', $date)
            ->where('reservation_time', $time)
            ->whereIn('reservation_status', ['pending', 'confirmed'])
            ->whereIn('payment_status', ['pending', 'paid'])
            ->exists();
    }

    /**
     * Check availability with a database lock to prevent race conditions.
     * Used just before confirming a reservation.
     */
    public function checkAvailabilityWithLock(int $tableId, string $date, string $time): bool
    {
        return DB::transaction(function () use ($tableId, $date, $time) {
            $reserved = Reservation::where('table_id', $tableId)
                ->where('reservation_date', $date)
                ->where('reservation_time', $time)
                ->whereIn('reservation_status', ['pending', 'confirmed'])
                ->whereIn('payment_status', ['pending', 'paid'])
                ->lockForUpdate()
                ->exists();

            return !$reserved;
        });
    }
}
