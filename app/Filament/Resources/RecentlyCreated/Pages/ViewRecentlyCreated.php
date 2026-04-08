<?php

namespace App\Filament\Resources\RecentlyCreated\Pages;

use App\Filament\Resources\RecentlyCreated\RecentlyCreatedResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewRecentlyCreated extends ViewRecord
{
    protected static string $resource = RecentlyCreatedResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
