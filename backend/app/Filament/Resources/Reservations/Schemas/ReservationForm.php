<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Textarea;

class ReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload(),
                Select::make('table_id')
                    ->relationship('table', 'table_number')
                    ->required()
                    ->searchable()
                    ->preload(),
                TextInput::make('customer_name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('customer_email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                TextInput::make('customer_phone')
                    ->tel()
                    ->required()
                    ->maxLength(255),
                TextInput::make('guests')
                    ->required()
                    ->numeric()
                    ->default(1),
                DatePicker::make('reservation_date')
                    ->required(),
                TimePicker::make('reservation_time')
                    ->required(),
                TextInput::make('reservation_fee')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Select::make('payment_status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'failed' => 'Failed',
                        'refunded' => 'Refunded',
                    ])
                    ->required()
                    ->default('pending'),
                Select::make('reservation_status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ])
                    ->required()
                    ->default('pending'),
                TextInput::make('stripe_payment_id')
                    ->maxLength(255),
                Textarea::make('special_request')
                    ->maxLength(65535)
                    ->columnSpanFull(),
            ]);
    }
}
