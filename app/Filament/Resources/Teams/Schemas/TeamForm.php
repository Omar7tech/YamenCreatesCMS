<?php

namespace App\Filament\Resources\Teams\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TeamForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Full Name')
                    ->required()
                    ->placeholder('Enter team member name'),

                TextInput::make('position')
                    ->label('Position/Role')
                    ->required()
                    ->placeholder('e.g., Creative Director'),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->placeholder('Optional short description or subheading'),
            ]);
    }
}
