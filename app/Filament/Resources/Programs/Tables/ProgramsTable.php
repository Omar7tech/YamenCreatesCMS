<?php

namespace App\Filament\Resources\Programs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProgramsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort')
            ->reorderable('sort')
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->label('Images')
                    ->collection('program-images')
                    ->conversion('webp')
                    ->circular()
                    ->stacked()
                    ->ring(5)
                    ->limitedRemainingText()
                    ->limit(3),
                TextColumn::make('title')
                    ->searchable()
                    ->weight('semibold'),
                TextColumn::make('subtitle')
                    ->searchable()
                    ->placeholder('—')
                    ->limit(50),
                IconColumn::make('have_cta')
                    ->label('CTA')
                    ->boolean(),
                ToggleColumn::make('is_active')
                    ->label('Published'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
