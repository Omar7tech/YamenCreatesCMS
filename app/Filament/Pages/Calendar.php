<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\EventsCalendar;
use Filament\Pages\Page;

class Calendar extends Page
{
    protected static string|null|\BackedEnum $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Calendar';
    protected static ?string $title = 'Events Calendar';
    protected string $view = 'filament.pages.calendar';

    public function getHeaderWidgets(): array
    {
        return [
            EventsCalendar::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int | array
    {
        return 1;
    }
}
