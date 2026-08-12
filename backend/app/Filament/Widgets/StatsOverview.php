<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use App\Models\MenuItem;
use App\Models\Reservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Réservations Totales', Reservation::count())
                ->description('Toutes les réservations')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary')
                ->chart([7, 2, 10, 3, 15, 4, 17]),

            Stat::make('Plats au Menu', MenuItem::count())
                ->description('Plats actifs')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('success')
                ->chart([3, 5, 4, 7, 5, 8, 9]),

            Stat::make('Messages Reçus', ContactMessage::count())
                ->description('Demandes clients')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('warning')
                ->chart([1, 0, 2, 0, 1, 3, 2]),
        ];
    }
}
