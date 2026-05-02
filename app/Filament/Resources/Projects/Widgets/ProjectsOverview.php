<?php

namespace App\Filament\Resources\Projects\Widgets;

use App\Models\Project;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ProjectsOverview extends BaseWidget
{
    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getStats(): array
    {
        $totalProjects = Project::query()->count();

        return [
            Stat::make('Total Projects', (string) $totalProjects)
                ->description('All project records')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success')
                ->icon('heroicon-o-rectangle-stack')
                ->columnSpan(2),
        ];
    }
}
