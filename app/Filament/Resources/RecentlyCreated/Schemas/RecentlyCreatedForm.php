<?php

namespace App\Filament\Resources\RecentlyCreated\Schemas;

use App\Models\RecentlyCreated;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Schemas\Schema;

class RecentlyCreatedForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('image_1')
                    ->label('Image 1 — Small Left')
                    ->image()
                    ->required()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->previewable()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->collection(RecentlyCreated::IMAGE_1)
                    ->conversion('webp')
                    ->directory('recently-created')
                    ->visibility('public')
                    ->maxSize(6144)
                    ->disk('public')
                    ->helperText('Upload the small-left image (max 6MB)'),

                SpatieMediaLibraryFileUpload::make('image_2')
                    ->label('Image 2 — Small Right')
                    ->image()
                    ->required()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->previewable()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->collection(RecentlyCreated::IMAGE_2)
                    ->conversion('webp')
                    ->directory('recently-created')
                    ->visibility('public')
                    ->maxSize(6144)
                    ->disk('public')
                    ->helperText('Upload the small-right image (max 6MB)'),

                SpatieMediaLibraryFileUpload::make('image_3')
                    ->label('Image 3 — Large')
                    ->image()
                    ->required()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->previewable()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->collection(RecentlyCreated::IMAGE_3)
                    ->conversion('webp')
                    ->directory('recently-created')
                    ->visibility('public')
                    ->maxSize(6144)
                    ->disk('public')
                    ->helperText('Upload the large image (max 6MB)'),
            ])
            ->columns(3);
    }
}
