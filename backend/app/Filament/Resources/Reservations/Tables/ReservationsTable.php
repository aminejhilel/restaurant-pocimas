<?php

namespace App\Filament\Resources\Reservations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;

class ReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('customer_name')->searchable(),
                TextColumn::make('customer_phone')->searchable(),
                TextColumn::make('table.table_number')->sortable()->searchable(),
                TextColumn::make('reservation_date')->date()->sortable(),
                TextColumn::make('reservation_time')->time()->sortable(),
                TextColumn::make('reservation_status')->badge(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
