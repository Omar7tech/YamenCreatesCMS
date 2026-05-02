<?php

namespace App\Filament\Resources\RecentlyCreated\Widgets;

use App\Models\RecentlyCreated;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class RecentlyCreatedOverview extends BaseWidget
{
    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getStats(): array
    {
        $totalRecords = RecentlyCreated::query()->count();

        return [
            Stat::make('Total Records', (string) $totalRecords)
                ->description('All recently created records')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success')
                ->icon('heroicon-o-rectangle-stack')
                ->columnSpan(2),
        ];
    }
}
