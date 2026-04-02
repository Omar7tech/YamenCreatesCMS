<?php

namespace App\Filament\Resources\Programs\Widgets;

use App\Models\Program;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ProgramsOverview extends BaseWidget
{
    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getStats(): array
    {
        $totalPrograms = Program::query()->count();
       

        return [
            Stat::make('Total Programs', (string) $totalPrograms)
                ->description('All program records')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success')->icon('heroicon-o-rectangle-stack')->columnSpan(2),
        ];
    }
}
