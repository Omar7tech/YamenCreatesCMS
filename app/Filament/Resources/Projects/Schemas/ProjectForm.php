<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('ProjectSections')
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
                                    ->label('Project Title')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->placeholder('Enter the project title'),

                                Select::make('category_id')
                                    ->label('Category')
                                    ->relationship('category', 'title')
                                    ->required()
                                    ->searchable()
                                    ->preload(),
                            ]),

                        Tab::make('media')
                            ->label('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Select::make('media_type')
                                    ->label('Media Type')
                                    ->options([
                                        'image' => 'Image',
                                        'video' => 'Video',
                                    ])
                                    ->default('image')
                                    ->required()
                                    ->live(),

                                SpatieMediaLibraryFileUpload::make('project_image')
                                    ->label('Project Image')
                                    ->image()
                                    ->downloadable()
                                    ->openable()
                                    ->imageEditor()
                                    ->previewable()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                                    ->collection('project-images')
                                    ->conversion('webp')
                                    ->directory('project-images')
                                    ->visibility('public')
                                    ->maxSize(6144)
                                    ->disk('public')
                                    ->helperText('Upload a project image (max 6MB)')
                                    ->columnSpanFull()
                                    ->requiredIf('media_type', 'image')
                                    ->visibleJs(<<<'JS'
                                        $get('media_type') === 'image'
                                        JS),

                                SpatieMediaLibraryFileUpload::make('project_video')
                                    ->label('Project Video')
                                    ->downloadable()
                                    ->openable()
                                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg'])
                                    ->collection('project-videos')
                                    ->directory('project-videos')
                                    ->visibility('public')
                                    ->maxSize(102400)
                                    ->disk('public')
                                    ->helperText('Upload a project video (max 100MB)')
                                    ->columnSpanFull()
                                    ->requiredIf('media_type', 'video')
                                    ->visibleJs(<<<'JS'
                                        $get('media_type') === 'video'
                                        JS),
                            ]),

                        Tab::make('project_type')
                            ->label('Project Type')
                            ->icon('heroicon-o-link')
                            ->schema([
                                Toggle::make('is_internal')
                                    ->label('Internal Project Page')
                                    ->helperText('If enabled, project opens internal detail page. If disabled, project links to external URL.')
                                    ->default(true)
                                    ->inline(false)
                                    ->live(),

                                TextInput::make('external_url')
                                    ->label('External URL')
                                    ->url()
                                    ->placeholder('https://example.com/project')
                                    ->helperText('Project will link to this URL when clicked')
                                    ->requiredIf('is_internal', false)
                                    ->visibleJs(<<<'JS'
                                        $get('is_internal') === false
                                        JS),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
