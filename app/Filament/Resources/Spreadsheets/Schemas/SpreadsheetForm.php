<?php

namespace App\Filament\Resources\Spreadsheets\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Qalainau\UniverSheet\SpreadsheetField;

class SpreadsheetForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                SpreadsheetField::make('data')
                    ->columnSpanFull()
                    ->ribbonType('collapsed')
                    ->label('Spreadsheet Data'),
            ]);
    }
}
