<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Widgets\ChartWidget;

class ReservationStatusChart extends ChartWidget
{
    protected ?string $heading = 'Statuts des Réservations';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 1;
    protected ?string $maxHeight = '280px';

    protected function getData(): array
    {
        $pending   = Reservation::where('reservation_status', 'pending')->count();
        $confirmed = Reservation::where('reservation_status', 'confirmed')->count();
        $cancelled = Reservation::where('reservation_status', 'cancelled')->count();
        $completed = Reservation::where('reservation_status', 'completed')->count();

        return [
            'datasets' => [
                [
                    'data'            => [$pending, $confirmed, $cancelled, $completed],
                    'backgroundColor' => [
                        'rgba(212, 175, 55, 0.85)',  // pending — gold
                        'rgba(16, 185, 129, 0.85)',  // confirmed — green
                        'rgba(244, 63, 94, 0.85)',   // cancelled — red
                        'rgba(99, 102, 241, 0.85)',  // completed — indigo
                    ],
                    'borderColor'     => [
                        '#D4AF37',
                        '#10b981',
                        '#f43f5e',
                        '#6366f1',
                    ],
                    'borderWidth'   => 2,
                    'hoverOffset'   => 8,
                ],
            ],
            'labels' => ['En attente', 'Confirmées', 'Annulées', 'Complétées'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display'  => true,
                    'position' => 'bottom',
                    'labels'   => [
                        'usePointStyle' => true,
                        'padding'       => 16,
                        'font'          => ['size' => 12, 'family' => 'Outfit'],
                    ],
                ],
                'tooltip' => [
                    'callbacks' => [],
                ],
            ],
            'cutout'       => '70%',
            'maintainAspectRatio' => false,
        ];
    }
}
