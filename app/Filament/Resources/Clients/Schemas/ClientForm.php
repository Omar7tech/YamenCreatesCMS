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
                    ->required(),
                SpatieMediaLibraryFileUpload::make('logo')
                    ->collection('logo')
                    ->acceptedFileTypes(['image/png'])
                    ->maxSize(2048),
            ]);
    }
}
