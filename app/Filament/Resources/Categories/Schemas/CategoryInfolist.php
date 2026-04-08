<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class CategoryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Category Details')
                    ->icon(Heroicon::OutlinedTag)
                    ->schema([
                        TextEntry::make('title')
                            ->weight('bold'),
                        TextEntry::make('projects_count')
                            ->label('Projects')
                            ->state(fn ($record) => $record->projects()->count())
                            ->badge()
                            ->color('gray'),
                        IconEntry::make('is_active')
                            ->label('Published')
                            ->boolean(),
                    ])
                    ->columns(2),

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
