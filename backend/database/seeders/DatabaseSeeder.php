<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\RestaurantTable;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@restaurant.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Settings
        Setting::truncate();
        Setting::create([
            'restaurant_name' => 'Le Gourmet',
            'email' => 'contact@legourmet.test',
            'phone' => '+33 1 23 45 67 89',
            'address' => '123 Avenue des Champs-Élysées, 75008 Paris',
            'opening_hours' => 'Mon-Sun: 18:00 - 23:00',
            'reservation_fee' => 3.00,
        ]);

        // Tables (15 tables)
        RestaurantTable::truncate();
        $tables = [
            ['table_number' => 'T01', 'capacity' => 2, 'shape' => 'round', 'position_x' => 10, 'position_y' => 10],
            ['table_number' => 'T02', 'capacity' => 2, 'shape' => 'round', 'position_x' => 10, 'position_y' => 30],
            ['table_number' => 'T03', 'capacity' => 2, 'shape' => 'round', 'position_x' => 10, 'position_y' => 50],
            ['table_number' => 'T04', 'capacity' => 4, 'shape' => 'square', 'position_x' => 40, 'position_y' => 10],
            ['table_number' => 'T05', 'capacity' => 4, 'shape' => 'square', 'position_x' => 40, 'position_y' => 30],
            ['table_number' => 'T06', 'capacity' => 4, 'shape' => 'square', 'position_x' => 40, 'position_y' => 50],
            ['table_number' => 'T07', 'capacity' => 4, 'shape' => 'square', 'position_x' => 70, 'position_y' => 10],
            ['table_number' => 'T08', 'capacity' => 4, 'shape' => 'square', 'position_x' => 70, 'position_y' => 30],
            ['table_number' => 'T09', 'capacity' => 4, 'shape' => 'square', 'position_x' => 70, 'position_y' => 50],
            ['table_number' => 'T10', 'capacity' => 6, 'shape' => 'rectangle', 'position_x' => 40, 'position_y' => 70],
            ['table_number' => 'T11', 'capacity' => 6, 'shape' => 'rectangle', 'position_x' => 70, 'position_y' => 70],
            ['table_number' => 'T12', 'capacity' => 8, 'shape' => 'rectangle', 'position_x' => 40, 'position_y' => 90],
            ['table_number' => 'T13', 'capacity' => 2, 'shape' => 'square', 'position_x' => 10, 'position_y' => 70],
            ['table_number' => 'T14', 'capacity' => 2, 'shape' => 'square', 'position_x' => 10, 'position_y' => 90],
            ['table_number' => 'T15', 'capacity' => 10, 'shape' => 'rectangle', 'position_x' => 70, 'position_y' => 90],
        ];

        foreach ($tables as $t) {
            RestaurantTable::create($t);
        }

        // Menu Categories and Items
        MenuCategory::truncate();
        MenuItem::truncate();

        $starters = MenuCategory::create(['name' => 'Starters', 'description' => 'Appetizing starters']);
        $starters->items()->createMany([
            ['name' => 'French Onion Soup', 'description' => 'Classic french onion soup with cheese crouton', 'price' => 8.50],
            ['name' => 'Escargots de Bourgogne', 'description' => 'Snails in garlic-herb butter', 'price' => 12.00],
            ['name' => 'Beef Carpaccio', 'description' => 'Thinly sliced beef with truffle oil and parmesan', 'price' => 14.50],
        ]);

        $mains = MenuCategory::create(['name' => 'Main Courses', 'description' => 'Hearty main dishes']);
        $mains->items()->createMany([
            ['name' => 'Boeuf Bourguignon', 'description' => 'Beef braised in red wine with mushrooms and pearl onions', 'price' => 24.00],
            ['name' => 'Coq au Vin', 'description' => 'Chicken braised with wine, lardons, and mushrooms', 'price' => 22.00],
            ['name' => 'Ratatouille', 'description' => 'Provençal vegetable stew', 'price' => 18.00],
            ['name' => 'Duck Confit', 'description' => 'Slow-cooked duck leg with roasted potatoes', 'price' => 26.00],
        ]);

        $desserts = MenuCategory::create(['name' => 'Desserts', 'description' => 'Sweet treats']);
        $desserts->items()->createMany([
            ['name' => 'Crème Brûlée', 'description' => 'Classic vanilla custard with caramelized sugar', 'price' => 9.00],
            ['name' => 'Chocolate Lava Cake', 'description' => 'Warm chocolate cake with molten center', 'price' => 10.50],
            ['name' => 'Tarte Tatin', 'description' => 'Caramelized apple tart', 'price' => 9.50],
        ]);

        $drinks = MenuCategory::create(['name' => 'Drinks', 'description' => 'Refreshing beverages']);
        $drinks->items()->createMany([
            ['name' => 'Red Wine (Glass)', 'description' => 'House red wine', 'price' => 7.00],
            ['name' => 'White Wine (Glass)', 'description' => 'House white wine', 'price' => 7.00],
            ['name' => 'Sparkling Water', 'description' => 'San Pellegrino 500ml', 'price' => 4.00],
            ['name' => 'Espresso', 'description' => 'Double shot espresso', 'price' => 3.50],
        ]);
    }
}
