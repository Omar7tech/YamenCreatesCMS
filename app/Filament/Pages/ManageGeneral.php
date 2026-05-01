<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ManageGeneral extends SettingsPage
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string $settings = GeneralSettings::class;

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        Tabs\Tab::make('Social Media')
                            ->icon(Heroicon::OutlinedShare)
                            ->schema([
                                Repeater::make('social_media')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->placeholder('e.g., Instagram, LinkedIn, Twitter'),
                                        TextInput::make('link')
                                            ->required()
                                            ->url()
                                            ->placeholder('https://...'),
                                    ])
                                    ->addActionLabel('Add Social Media')
                                    ->reorderable(false)
                                    ->columnSpanFull(),
                            ]),
                        Tabs\Tab::make('Contact Email')
                            ->icon(Heroicon::OutlinedEnvelope)
                            ->schema([
                                Repeater::make('contact_email')
                                    ->schema([
                                        TextInput::make('email')
                                            ->required()
                                            ->email()
                                            ->placeholder('info@yamencreates.com'),
                                    ])
                                    ->addActionLabel('Add Email')
                                    ->reorderable(false)
                                    ->columnSpanFull(),
                            ]),
                        Tabs\Tab::make('Contact Phone')
                            ->icon(Heroicon::OutlinedPhone)
                            ->schema([
                                Repeater::make('contact_phone')
                                    ->schema([
                                        TextInput::make('phone')
                                            ->required()
                                            ->tel()
                                            ->placeholder('+961 70 075 077'),
                                    ])
                                    ->addActionLabel('Add Phone Number')
                                    ->reorderable(false)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
