<?php

namespace App\Filament\Resources\RestaurantTables\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;

class RestaurantTableForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('table_number')
                    ->required()
                    ->maxLength(255),
                TextInput::make('capacity')
                    ->required()
                    ->numeric()
                    ->default(1),
                Select::make('shape')
                    ->options([
                        'square' => 'Square',
                        'round' => 'Round',
                        'rectangle' => 'Rectangle',
                    ])
                    ->required()
                    ->default('square'),
                TextInput::make('position_x')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('position_y')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('status')
                    ->required()
                    ->default(true),
            ]);
    }
}
