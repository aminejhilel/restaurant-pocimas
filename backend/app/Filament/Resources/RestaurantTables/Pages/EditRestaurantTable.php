<?php

namespace App\Filament\Resources\RestaurantTables\Pages;

use App\Filament\Resources\RestaurantTables\RestaurantTableResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRestaurantTable extends EditRecord
{
    protected static string $resource = RestaurantTableResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
