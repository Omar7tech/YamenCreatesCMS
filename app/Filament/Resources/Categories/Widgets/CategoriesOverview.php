<?php

namespace App\Filament\Resources\Categories\Widgets;

use App\Models\Category;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CategoriesOverview extends BaseWidget
{
    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getStats(): array
    {
        $totalCategories = Category::query()->count();

        return [
            Stat::make('Total Categories', (string) $totalCategories)
                ->description('All category records')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success')
                ->icon('heroicon-o-rectangle-stack')
                ->columnSpan(2),
        ];
    }
}
