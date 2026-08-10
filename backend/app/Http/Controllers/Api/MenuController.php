<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Models\MenuItem;

class MenuController extends Controller
{
    public function index()
    {
        $categories = MenuCategory::with(['items' => fn($q) => $q->where('available', true)])
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'description' => $cat->description,
                'items' => $cat->items->map(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price' => $item->price,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'available' => $item->available,
                ]),
            ]);

        return response()->json($categories);
    }

    public function categories()
    {
        return response()->json(MenuCategory::all(['id', 'name', 'description']));
    }
}
