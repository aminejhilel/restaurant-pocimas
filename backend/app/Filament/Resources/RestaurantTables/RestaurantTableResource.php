<?php

namespace App\Filament\Resources\RestaurantTables;

use App\Filament\Resources\RestaurantTables\Pages\CreateRestaurantTable;
use App\Filament\Resources\RestaurantTables\Pages\EditRestaurantTable;
use App\Filament\Resources\RestaurantTables\Pages\ListRestaurantTables;
use App\Filament\Resources\RestaurantTables\Schemas\RestaurantTableForm;
use App\Filament\Resources\RestaurantTables\Tables\RestaurantTablesTable;
use App\Models\RestaurantTable;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RestaurantTableResource extends Resource
{
    protected static ?string $model = RestaurantTable::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return RestaurantTableForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RestaurantTablesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRestaurantTables::route('/'),
            'create' => CreateRestaurantTable::route('/create'),
            'edit' => EditRestaurantTable::route('/{record}/edit'),
        ];
    }
}
