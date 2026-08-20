<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class ReservationsChart extends ChartWidget
{
    protected ?string $heading = 'Réservations — 30 derniers jours';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';
    protected ?string $maxHeight = '320px';

    protected function getData(): array
    {
        $days = collect(range(29, 0))->map(fn ($d) => now()->subDays($d)->format('Y-m-d'));

        $confirmed = $this->getCountsPerDay('confirmed', $days);
        $pending   = $this->getCountsPerDay('pending', $days);
        $cancelled = $this->getCountsPerDay('cancelled', $days);
        $completed = $this->getCountsPerDay('completed', $days);

        $labels = $days->map(fn ($d) => Carbon::parse($d)->format('d M'))->toArray();

        return [
            'datasets' => [
                [
                    'label'           => 'Confirmées',
                    'data'            => $confirmed,
                    'borderColor'     => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.08)',
                    'fill'            => true,
                    'tension'         => 0.4,
                    'borderWidth'     => 2,
                    'pointRadius'     => 3,
                    'pointBackgroundColor' => '#10b981',
                ],
                [
                    'label'           => 'En attente',
                    'data'            => $pending,
                    'borderColor'     => '#D4AF37',
                    'backgroundColor' => 'rgba(212, 175, 55, 0.06)',
                    'fill'            => true,
                    'tension'         => 0.4,
                    'borderWidth'     => 2,
                    'pointRadius'     => 3,
                    'pointBackgroundColor' => '#D4AF37',
                ],
                [
                    'label'           => 'Annulées',
                    'data'            => $cancelled,
                    'borderColor'     => '#f43f5e',
                    'backgroundColor' => 'rgba(244, 63, 94, 0.06)',
                    'fill'            => true,
                    'tension'         => 0.4,
                    'borderWidth'     => 2,
                    'pointRadius'     => 3,
                    'pointBackgroundColor' => '#f43f5e',
                ],
                [
                    'label'           => 'Complétées',
                    'data'            => $completed,
                    'borderColor'     => '#6366f1',
                    'backgroundColor' => 'rgba(99, 102, 241, 0.06)',
                    'fill'            => true,
                    'tension'         => 0.4,
                    'borderWidth'     => 2,
                    'pointRadius'     => 3,
                    'pointBackgroundColor' => '#6366f1',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getCountsPerDay(string $status, $days): array
    {
        $counts = Reservation::where('reservation_status', $status)
            ->whereBetween('reservation_date', [$days->first(), $days->last()])
            ->selectRaw('reservation_date, count(*) as count')
            ->groupBy('reservation_date')
            ->pluck('count', 'reservation_date');

        return $days->map(fn ($d) => $counts[$d] ?? 0)->toArray();
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display'  => true,
                    'position' => 'top',
                    'labels'   => [
                        'usePointStyle' => true,
                        'padding'       => 20,
                        'font'          => ['size' => 12, 'family' => 'Outfit'],
                    ],
                ],
                'tooltip' => [
                    'mode'      => 'index',
                    'intersect' => false,
                ],
            ],
            'scales' => [
                'x' => [
                    'grid' => ['color' => 'rgba(255,255,255,0.04)'],
                    'ticks' => ['maxTicksLimit' => 10, 'font' => ['size' => 11]],
                ],
                'y' => [
                    'beginAtZero' => true,
                    'grid'        => ['color' => 'rgba(255,255,255,0.04)'],
                    'ticks'       => ['precision' => 0, 'font' => ['size' => 11]],
                ],
            ],
            'interaction' => ['mode' => 'nearest', 'axis' => 'x', 'intersect' => false],
        ];
    }
}
