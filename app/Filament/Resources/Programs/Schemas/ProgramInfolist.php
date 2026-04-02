<?php

namespace App\Filament\Resources\Programs\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ProgramInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Program Overview')
                    ->icon(Heroicon::OutlinedInformationCircle)
                    ->schema([
                        TextEntry::make('title')
                            ->label('Program Title')
                            ->weight('bold'),
                        TextEntry::make('slug')
                            ->copyable()
                            ->badge()
                            ->color('gray'),
                        TextEntry::make('subtitle')
                            ->placeholder('No subtitle added')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Program Content')
                    ->icon(Heroicon::OutlinedDocumentText)
                    ->schema([
                        RepeatableEntry::make('bullets')
                            ->label('Key Points')
                            ->schema([
                                TextEntry::make('bullet')
                                    ->hiddenLabel()
                                    ->icon(Heroicon::OutlinedCheckCircle),
                            ])
                            ->contained(false)
                            ->columnSpanFull(),
                        RepeatableEntry::make('features')
                            ->label('Program Features')
                            ->schema([
                                TextEntry::make('feature')
                                    ->hiddenLabel()
                                    ->badge()
                                    ->icon(Heroicon::OutlinedSparkles),
                            ])
                            ->contained(false)
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
                Section::make('Call To Action')
                    ->icon(Heroicon::OutlinedMegaphone)
                    ->schema([
                        IconEntry::make('have_cta')
                            ->label('CTA Enabled')
                            ->boolean(),
                        TextEntry::make('cta_text')
                            ->label('CTA Button Text')
                            ->placeholder('No CTA text configured'),
                        TextEntry::make('cta_url')
                            ->label('CTA Destination')
                            ->placeholder('No CTA URL configured')
                            ->url(fn (?string $state): ?string => filled($state) ? $state : null)
                            ->openUrlInNewTab(),
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
