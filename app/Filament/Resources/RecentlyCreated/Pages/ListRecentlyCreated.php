<?php

namespace App\Filament\Resources\RecentlyCreated\Pages;

use App\Filament\Resources\RecentlyCreated\RecentlyCreatedResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRecentlyCreated extends ListRecords
{
    protected static string $resource = RecentlyCreatedResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
