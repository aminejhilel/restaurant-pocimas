<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RestaurantTable;
use App\Services\TableAvailabilityService;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function __construct(private TableAvailabilityService $availabilityService) {}

    public function index()
    {
        $tables = RestaurantTable::where('status', true)->get();
        return response()->json($tables);
    }

    public function availability(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'guests' => 'required|integer|min:1',
        ]);

        $tables = $this->availabilityService->getTablesWithAvailability(
            $request->date,
            $request->time,
            $request->guests
        );

        return response()->json($tables);
    }
}
