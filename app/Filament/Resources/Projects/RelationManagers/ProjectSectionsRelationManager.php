<?php

namespace App\Filament\Resources\Projects\RelationManagers;

use App\Enums\SectionType;
use App\Models\ProjectSection;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Schema;
use Filament\Tables\Actions\BulkActionGroup;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProjectSectionsRelationManager extends RelationManager
{
    protected static string $relationship = 'sections';

    protected static ?string $title = 'Project Sections';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('title')
                    ->label('Section Title')
                    ->placeholder('Optional heading for this section')
                    ->maxLength(255),

                Select::make('type')
                    ->label('Section Type')
                    ->options(SectionType::class)
                    ->required()
                    ->live()
                    ->default(SectionType::TextOnly->value),

                Toggle::make('is_active')
                    ->label('Published')
                    ->default(true)
                    ->inline(false),

                RichEditor::make('content')
                    ->label('Content')
                    ->toolbarButtons([
                        'bold',
                        'bulletList',
                        'h2',
                        'h3',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'undo',
                    ])
                    ->columnSpanFull()
                    ->requiredIf('type', [
                        SectionType::TextOnly->value,
                        SectionType::LeftImageText->value,
                        SectionType::RightImageText->value,
                    ])
                    ->visibleJs(<<<'JS'
                        ['text_only', 'left_image_text', 'right_image_text'].includes($get('type'))
                        JS),

                SpatieMediaLibraryFileUpload::make('single_image')
                    ->label('Image')
                    ->image()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->collection(ProjectSection::SINGLE_IMAGE_COLLECTION)
                    ->conversion('webp')
                    ->maxSize(6144)
                    ->helperText('Upload image (max 6MB)')
                    ->columnSpanFull()
                    ->requiredIf('type', [
                        SectionType::LeftImageText->value,
                        SectionType::RightImageText->value,
                    ])
                    ->visibleJs(<<<'JS'
                        ['left_image_text', 'right_image_text'].includes($get('type'))
                        JS),

                SpatieMediaLibraryFileUpload::make('gallery_images')
                    ->label('Gallery Images')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->collection(ProjectSection::GALLERY_IMAGES_COLLECTION)
                    ->conversion('webp')
                    ->maxSize(6144)
                    ->helperText('Upload multiple images (max 6MB each)')
                    ->columnSpanFull()
                    ->requiredIf('type', SectionType::ImageGallery->value)
                    ->visibleJs(<<<'JS'
                        $get('type') === 'image_gallery'
                        JS),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->defaultSort('sort')
            ->reorderable('sort')
            ->columns([
                TextColumn::make('title')
                    ->label('Title')
                    ->default('Untitled')
                    ->searchable(),

                TextColumn::make('type')
                    ->badge()
                    ->sortable(),

                ToggleColumn::make('is_active')
                    ->label('Published'),

                TextColumn::make('sort')
                    ->label('Order')
                    ->sortable(),
            ])
            ->headerActions([
                CreateAction::make()
                    ->modalWidth('3xl'),
            ])
            ->actions([
                EditAction::make()
                    ->modalWidth('3xl'),
                DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
