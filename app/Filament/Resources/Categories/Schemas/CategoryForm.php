<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Toggle::make('is_active')
                    ->label('Published')
                    ->default(true)
                    ->inline(false),

                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->placeholder('Enter category title'),
            ]);
    }
}
