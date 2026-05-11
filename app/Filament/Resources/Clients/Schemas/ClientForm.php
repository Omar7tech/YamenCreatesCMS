<?php

namespace App\Filament\Resources\Clients\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ClientForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Client Name')
                    ->required()
                    ->placeholder('Enter client name'),

                SpatieMediaLibraryFileUpload::make('logo')
                    ->label('Client Logo')
                    ->collection('logo')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->acceptedFileTypes(['image/png'])
                    ->maxSize(2048)
                    ->downloadable()
                    ->openable()
                    ->required()
                    ->previewable()
                    ->helperText('Upload PNG logo (max 2MB)'),
            ]);
    }
}
