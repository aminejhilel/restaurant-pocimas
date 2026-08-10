<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('restaurant_name')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('logo')
                    ->image(),
                TextInput::make('email')
                    ->email()
                    ->maxLength(255),
                TextInput::make('phone')
                    ->tel()
                    ->maxLength(255),
                Textarea::make('address')
                    ->maxLength(65535)
                    ->columnSpanFull(),
                TextInput::make('opening_hours')
                    ->maxLength(255),
                TextInput::make('reservation_fee')
                    ->required()
                    ->numeric()
                    ->default(3.00),
                TextInput::make('facebook')
                    ->maxLength(255),
                TextInput::make('instagram')
                    ->maxLength(255),
            ]);
    }
}
