<?php

namespace App\Filament\Resources\Programs\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('ProgramSections')
                    ->tabs([
                        Tab::make('basic_information')
                            ->label('Basic Information')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Published')
                                    ->default(true)
                                    ->inline(false),

                                TextInput::make('title')
                                    ->label('Program Title')
                                    ->required()
                                    ->placeholder('Enter the program title'),

                                TextInput::make('subtitle')
                                    ->label('Program Subtitle')
                                    ->placeholder('Enter a brief subtitle'),
                            ]),

                        Tab::make('content_details')
                            ->label('Content Details')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Repeater::make('bullets')
                                    ->label('Key Points')
                                    ->table([
                                        TableColumn::make('bullet'),
                                    ])
                                    ->schema([
                                        TextInput::make('bullet')
                                            ->required()
                                            ->label('Key Point')
                                            ->placeholder('Enter a key point'),
                                    ])
                                    ->compact()
                                    ->columnSpanFull(),

                                Repeater::make('features')
                                    ->label('Program Features')
                                    ->table([
                                        TableColumn::make('feature'),
                                    ])
                                    ->schema([
                                        TextInput::make('feature')
                                            ->required()
                                            ->label('Feature')
                                            ->placeholder('Enter a program feature'),
                                    ])
                                    ->compact()
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('call_to_action')
                            ->label('Call to Action')
                            ->icon('heroicon-o-paper-airplane')
                            ->schema([
                                Toggle::make('have_cta')
                                    ->label('Enable Call to Action')
                                    ->required()
                                    ->live(),

                                TextInput::make('cta_text')
                                    ->label('CTA Button Text')
                                    ->placeholder('e.g., Learn More, Get Started')
                                    ->visibleJs(<<<'JS'
                                        $get('have_cta')
                                        JS)
                                    ->requiredIf('have_cta', true),

                                TextInput::make('cta_url')
                                    ->label('CTA Button URL')

                                    ->placeholder('https://example.com')
                                    ->visibleJs(<<<'JS'
                                        $get('have_cta')
                                        JS)
                                    ->requiredIf('have_cta', true),
                            ]),

                        Tab::make('media')
                            ->label('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('images')
                                    ->label('Program Images')
                                    ->image()
                                    ->downloadable()
                                    ->openable()
                                    ->imageEditor()
                                    ->previewable()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                                    ->collection('program-images')
                                    ->conversion('webp')
                                    ->directory('program-images')
                                    ->visibility('public')
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                        '3:4',
                                    ])
                                    ->rules([
                                        'dimensions:max_width=2000,max_height=2000',
                                    ])
                                    ->reorderable()
                                    ->panelLayout('grid')
                                    ->maxSize(6144)
                                    ->disk('public')
                                    ->multiple(true)
                                    ->helperText('📸 Upload images (max 6MB)')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
