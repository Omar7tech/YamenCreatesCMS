<?php

namespace App\Filament\Resources\RecentlyCreated\Tables;

use App\Models\RecentlyCreated;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use TinusG\FilamentHoverImageColumn\HoverImageColumn;

class RecentlyCreatedTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort')
            ->reorderable('sort')
            ->columns([
                TextColumn::make('sort')
                    ->label('Order')
                    ->sortable(),
                HoverImageColumn::make('image_1')
                    ->label('Image 1')
                    ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_1, 'webp')
                        ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_1))
                    ->imageHeight(60)
                    ->imageWidth(90)
                    ->extraImgAttributes(['class' => 'object-cover rounded']),
                HoverImageColumn::make('image_2')
                    ->label('Image 2')
                    ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_2, 'webp')
                        ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_2))
                    ->imageHeight(60)
                    ->imageWidth(90)
                    ->extraImgAttributes(['class' => 'object-cover rounded']),
                HoverImageColumn::make('image_3')
                    ->label('Image 3')
                    ->state(fn (RecentlyCreated $record) => $record->getFirstMediaUrl(RecentlyCreated::IMAGE_3, 'webp')
                        ?: $record->getFirstMediaUrl(RecentlyCreated::IMAGE_3))
                    ->imageHeight(60)
                    ->imageWidth(90)
                    ->extraImgAttributes(['class' => 'object-cover rounded']),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
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
