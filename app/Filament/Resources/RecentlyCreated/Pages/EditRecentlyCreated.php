<?php

namespace App\Filament\Resources\RecentlyCreated\Pages;

use App\Filament\Resources\RecentlyCreated\RecentlyCreatedResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditRecentlyCreated extends EditRecord
{
    protected static string $resource = RecentlyCreatedResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
