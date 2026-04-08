<?php

namespace App\Filament\Resources\RecentlyCreated\Schemas;

use App\Models\RecentlyCreated;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class RecentlyCreatedInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Images')
                    ->icon(Heroicon::OutlinedPhoto)
                    ->schema([
                        ImageEntry::make('image_1')
                            ->label('Image 1 — Small Left')
                            ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_1, 'webp')
                                ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_1)),
                        ImageEntry::make('image_2')
                            ->label('Image 2 — Small Right')
                            ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_2, 'webp')
                                ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_2)),
                        ImageEntry::make('image_3')
                            ->label('Image 3 — Large')
                            ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_3, 'webp')
                                ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_3)),
                    ])
                    ->columns(3),

                Section::make('Timestamps')
                    ->icon(Heroicon::OutlinedClock)
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->placeholder('-'),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ])
            ->columns(1);
    }
}
