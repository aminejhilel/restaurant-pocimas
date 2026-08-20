<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use App\Models\MenuItem;
use App\Models\Reservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        // Sparkline: last 7 days reservation counts
        $last7 = collect(range(6, 0))->map(
            fn ($d) => Reservation::whereDate('created_at', now()->subDays($d))->count()
        )->toArray();

        // Sparkline: last 7 days contact messages
        $last7Messages = collect(range(6, 0))->map(
            fn ($d) => ContactMessage::whereDate('created_at', now()->subDays($d))->count()
        )->toArray();

        // Today's reservations
        $todayCount = Reservation::whereDate('reservation_date', today())->count();

        // Pending reservations
        $pendingCount = Reservation::where('reservation_status', 'pending')->count();

        return [
            Stat::make('Réservations Totales', Reservation::count())
                ->description('Toutes les réservations enregistrées')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary')
                ->chart($last7),

            Stat::make("Aujourd'hui", $todayCount)
                ->description('Réservations pour aujourd\'hui')
                ->descriptionIcon('heroicon-m-clock')
                ->color('success')
                ->chart(collect(range(6, 0))->map(
                    fn ($d) => Reservation::whereDate('reservation_date', now()->subDays($d))->count()
                )->toArray()),

            Stat::make('En Attente', $pendingCount)
                ->description('Réservations à confirmer')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('warning')
                ->chart(collect(range(6, 0))->map(
                    fn ($d) => Reservation::whereDate('created_at', now()->subDays($d))
                        ->where('reservation_status', 'pending')->count()
                )->toArray()),

            Stat::make('Messages Reçus', ContactMessage::count())
                ->description('Demandes clients non lues: ' . ContactMessage::where('status', 'new')->count())
                ->descriptionIcon('heroicon-m-envelope')
                ->color('info')
                ->chart($last7Messages),
        ];
    }
}
