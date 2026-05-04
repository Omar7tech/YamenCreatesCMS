# Project Sections Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multi-section project pages with rich content (text, images, galleries) and support for internal/external project routing.

**Architecture:** Single-table approach for sections with type-specific fields. Spatie Media Library for image handling. Filament relation manager for section CRUD. React components for frontend rendering.

**Tech Stack:** Laravel 11, Filament 5, Spatie Media Library, React/TypeScript, Inertia, TailwindCSS

---

## Task 1: Database Migrations

**Files:**
- Create: `database/migrations/YYYY_MM_DD_HHMMSS_add_is_internal_to_projects_table.php`
- Create: `database/migrations/YYYY_MM_DD_HHMMSS_create_project_sections_table.php`

- [ ] **Step 1: Create migration for projects table**

```bash
php artisan make:migration add_is_internal_to_projects_table --table=projects
```

Expected: Migration file created in `database/migrations/`

- [ ] **Step 2: Write projects table migration**

Edit the generated migration file:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('is_internal')->default(true)->after('media_type');
            $table->string('external_url')->nullable()->after('is_internal');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['is_internal', 'external_url']);
        });
    }
};
```

- [ ] **Step 3: Create migration for project_sections table**

```bash
php artisan make:migration create_project_sections_table
```

Expected: Migration file created in `database/migrations/`

- [ ] **Step 4: Write project_sections table migration**

Edit the generated migration file:

```php
<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Project::class)->constrained()->cascadeOnDelete();
            $table->enum('type', ['text_only', 'left_image_text', 'right_image_text', 'image_gallery']);
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->unsignedInteger('sort')->default(0)->index();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_sections');
    }
};
```

- [ ] **Step 5: Run migrations**

```bash
php artisan migrate
```

Expected: Both migrations run successfully, tables created/updated

- [ ] **Step 6: Commit migrations**

```bash
git add database/migrations/*add_is_internal_to_projects_table.php database/migrations/*create_project_sections_table.php
git commit -m "feat: add database migrations for project sections

Add is_internal and external_url to projects table
Create project_sections table with type, title, content, sort, is_active

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: SectionType Enum

**Files:**
- Create: `app/Enums/SectionType.php`
- Reference: `app/Enums/ProjectMediaType.php` (existing pattern)

- [ ] **Step 1: Create SectionType enum**

```php
<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Icons\Heroicon;

enum SectionType: string implements HasColor, HasIcon, HasLabel
{
    case TextOnly = 'text_only';
    case LeftImageText = 'left_image_text';
    case RightImageText = 'right_image_text';
    case ImageGallery = 'image_gallery';

    public function getLabel(): string
    {
        return match ($this) {
            self::TextOnly => 'Text Only',
            self::LeftImageText => 'Left Image + Text',
            self::RightImageText => 'Right Image + Text',
            self::ImageGallery => 'Image Gallery',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::TextOnly => 'gray',
            self::LeftImageText => 'info',
            self::RightImageText => 'success',
            self::ImageGallery => 'warning',
        };
    }

    public function getIcon(): string|\BackedEnum|null
    {
        return match ($this) {
            self::TextOnly => Heroicon::OutlinedDocumentText,
            self::LeftImageText => Heroicon::OutlinedPhoto,
            self::RightImageText => Heroicon::OutlinedPhoto,
            self::ImageGallery => Heroicon::OutlinedRectangleGroup,
        };
    }
}
```

- [ ] **Step 2: Verify enum works**

Open `php artisan tinker` and test:

```php
use App\Enums\SectionType;
SectionType::TextOnly->getLabel(); // Should return "Text Only"
SectionType::LeftImageText->value; // Should return "left_image_text"
```

Expected: No errors, correct values returned

- [ ] **Step 3: Commit enum**

```bash
git add app/Enums/SectionType.php
git commit -m "feat: add SectionType enum

Define four section types: TextOnly, LeftImageText, RightImageText, ImageGallery
Implement Filament contracts for labels, icons, colors

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: ProjectSection Model

**Files:**
- Create: `app/Models/ProjectSection.php`
- Reference: `app/Models/Project.php` (existing pattern for media)

- [ ] **Step 1: Create ProjectSection model**

```php
<?php

namespace App\Models;

use App\Enums\SectionType;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Guarded(['id', 'created_at', 'updated_at'])]
class ProjectSection extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    public const SINGLE_IMAGE_COLLECTION = 'section-single-image';
    public const GALLERY_IMAGES_COLLECTION = 'section-gallery-images';

    protected $attributes = [
        'sort' => 0,
        'is_active' => true,
    ];

    protected function casts(): array
    {
        return [
            'type' => SectionType::class,
            'is_active' => 'boolean',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderBy('sort')
            ->orderBy('id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::SINGLE_IMAGE_COLLECTION)
            ->singleFile()
            ->useDisk('public');

        $this->addMediaCollection(self::GALLERY_IMAGES_COLLECTION)
            ->useDisk('public');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(80)
            ->nonQueued();
    }
}
```

- [ ] **Step 2: Test model in tinker**

```php
use App\Models\ProjectSection;
$section = new ProjectSection(['type' => 'text_only']);
$section->type; // Should be instance of SectionType enum
$section->is_active; // Should be true
```

Expected: Model instantiates correctly, casts work

- [ ] **Step 3: Commit model**

```bash
git add app/Models/ProjectSection.php
git commit -m "feat: add ProjectSection model

Implement HasMedia with single-image and gallery collections
Add ordered() and active() scopes
Configure webp media conversions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Update Project Model

**Files:**
- Modify: `app/Models/Project.php`

- [ ] **Step 1: Add sections relationship to Project model**

Add this method after the `category()` relationship:

```php
public function sections(): HasMany
{
    return $this->hasMany(ProjectSection::class);
}
```

Add import at top:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;
```

- [ ] **Step 2: Add is_internal cast**

Update the `casts()` method to include:

```php
protected function casts(): array
{
    return [
        'is_active' => 'boolean',
        'media_type' => ProjectMediaType::class,
        'is_internal' => 'boolean',
    ];
}
```

- [ ] **Step 3: Test relationship in tinker**

```php
use App\Models\Project;
$project = Project::first();
$project->sections; // Should return empty collection (no sections yet)
$project->is_internal; // Should cast to boolean
```

Expected: Relationship works, cast works

- [ ] **Step 4: Commit model update**

```bash
git add app/Models/Project.php
git commit -m "feat: add sections relationship and is_internal cast to Project

Add HasMany relationship to ProjectSection
Add boolean cast for is_internal field

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Update ProjectForm Schema

**Files:**
- Modify: `app/Filament/Resources/Projects/Schemas/ProjectForm.php`

- [ ] **Step 1: Add Project Type tab to ProjectForm**

After the existing 'media' tab (around line 95), add new tab before the closing `]` of `->tabs([...])`:

```php
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
```

- [ ] **Step 2: Test in Filament**

1. Open browser to `/admin/projects/create`
2. Navigate to "Project Type" tab
3. Toggle "Internal Project Page" off
4. Verify "External URL" field appears
5. Toggle back on
6. Verify "External URL" field hides

Expected: Conditional visibility works correctly

- [ ] **Step 3: Commit form update**

```bash
git add app/Filament/Resources/Projects/Schemas/ProjectForm.php
git commit -m "feat: add Project Type tab to ProjectForm

Add is_internal toggle and conditional external_url field
Use visibleJs for reactive form behavior

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create ProjectSectionsRelationManager

**Files:**
- Create: `app/Filament/Resources/Projects/RelationManagers/ProjectSectionsRelationManager.php`

- [ ] **Step 1: Generate relation manager**

```bash
php artisan make:filament-relation-manager Projects/ProjectResource sections title
```

Expected: Relation manager file created

- [ ] **Step 2: Implement ProjectSectionsRelationManager**

Replace the generated content with:

```php
<?php

namespace App\Filament\Resources\Projects\RelationManagers;

use App\Enums\SectionType;
use App\Models\ProjectSection;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProjectSectionsRelationManager extends RelationManager
{
    protected static string $relationship = 'sections';

    protected static ?string $title = 'Project Sections';

    public function form(Form $form): Form
    {
        return $form
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
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
```

- [ ] **Step 3: Test relation manager creation**

1. Open `/admin/projects` in browser
2. Edit any project
3. Scroll to "Project Sections" relation manager
4. Click "Create"
5. Select different section types
6. Verify form fields show/hide correctly

Expected: Modal opens, conditional fields work

- [ ] **Step 4: Commit relation manager**

```bash
git add app/Filament/Resources/Projects/RelationManagers/ProjectSectionsRelationManager.php
git commit -m "feat: add ProjectSectionsRelationManager

Create modal form with type-specific conditional fields
Add reorderable table with title, type, status, sort columns
Support single image and gallery image uploads

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Register Relation Manager

**Files:**
- Modify: `app/Filament/Resources/Projects/ProjectResource.php`

- [ ] **Step 1: Add import for ProjectSectionsRelationManager**

Add at top with other imports:

```php
use App\Filament\Resources\Projects\RelationManagers\ProjectSectionsRelationManager;
```

- [ ] **Step 2: Register in getRelations() method**

Update the `getRelations()` method (around line 44):

```php
public static function getRelations(): array
{
    return [
        ProjectSectionsRelationManager::class,
    ];
}
```

- [ ] **Step 3: Test in browser**

1. Navigate to `/admin/projects` 
2. Edit any project
3. Verify "Project Sections" tab appears below main form
4. Test creating a section with each type

Expected: Relation manager tab visible and functional

- [ ] **Step 4: Commit registration**

```bash
git add app/Filament/Resources/Projects/ProjectResource.php
git commit -m "feat: register ProjectSectionsRelationManager in ProjectResource

Enable section management in project edit page

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Implement ProjectController Show Method

**Files:**
- Modify: `app/Http/Controllers/ProjectController.php`

- [ ] **Step 1: Implement show method**

Replace the empty `show()` method with:

```php
public function show(Project $project)
{
    $project->load([
        'category:id,title,slug',
        'sections' => function ($query) {
            $query->active()->ordered();
        },
        'sections.media',
    ]);

    $featuredImage = null;
    $featuredMedia = $project->getFirstMedia(
        $project->media_type->value === 'image' 
            ? Project::IMAGE_COLLECTION 
            : Project::VIDEO_COLLECTION
    );
    
    if ($featuredMedia && $featuredMedia->hasGeneratedConversion('webp')) {
        $featuredImage = $featuredMedia->getUrl('webp');
    } elseif ($featuredMedia) {
        $featuredImage = $featuredMedia->getUrl();
    }

    $sections = $project->sections->map(function ($section) {
        $data = [
            'id' => (string) $section->id,
            'title' => $section->title,
            'type' => $section->type->value,
            'content' => $section->content,
        ];

        if (in_array($section->type, [\App\Enums\SectionType::LeftImageText, \App\Enums\SectionType::RightImageText])) {
            $media = $section->getFirstMedia(\App\Models\ProjectSection::SINGLE_IMAGE_COLLECTION);
            $data['image'] = $media && $media->hasGeneratedConversion('webp')
                ? $media->getUrl('webp')
                : $media?->getUrl();
        }

        if ($section->type === \App\Enums\SectionType::ImageGallery) {
            $data['images'] = $section->getMedia(\App\Models\ProjectSection::GALLERY_IMAGES_COLLECTION)
                ->map(fn ($media) => $media->hasGeneratedConversion('webp') 
                    ? $media->getUrl('webp') 
                    : $media->getUrl()
                )
                ->values()
                ->toArray();
        }

        return $data;
    });

    return \Inertia\Inertia::render('project', [
        'project' => [
            'id' => (string) $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'category' => [
                'name' => $project->category->title,
                'slug' => $project->category->slug,
            ],
            'featuredImage' => $featuredImage,
            'sections' => $sections->toArray(),
        ],
    ]);
}
```

Add import at top:

```php
use App\Enums\SectionType;
use App\Models\ProjectSection;
use Inertia\Inertia;
```

- [ ] **Step 2: Test controller (will fail until route exists)**

We'll test this after adding the route in Task 11.

- [ ] **Step 3: Commit controller**

```bash
git add app/Http/Controllers/ProjectController.php
git commit -m "feat: implement ProjectController show method

Load project with category, active sections, and media
Transform sections data with images/galleries
Return Inertia response with structured data

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Update WorkProjectResource

**Files:**
- Modify: `app/Http/Resources/WorkProjectResource.php`

- [ ] **Step 1: Add new fields to toArray method**

Update the return array to include slug, isInternal, externalUrl:

```php
return [
    'id' => $this->slug,
    'title' => $this->title,
    'slug' => $this->slug,
    'mediaType' => $this->media_type->value,
    'mediaSrc' => $mediaSrc,
    'isInternal' => $this->is_internal,
    'externalUrl' => $this->external_url,
];
```

- [ ] **Step 2: Test in browser**

1. Open `/work` page
2. Open browser DevTools Network tab
3. Check Inertia props for workProjects
4. Verify slug, isInternal, externalUrl fields present

Expected: New fields included in response

- [ ] **Step 3: Commit resource update**

```bash
git add app/Http/Resources/WorkProjectResource.php
git commit -m "feat: add slug, isInternal, externalUrl to WorkProjectResource

Enable frontend to determine routing type for project cards

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Update TypeScript Types

**Files:**
- Modify: `resources/js/types/project.ts`

- [ ] **Step 1: Update WorkProject interface**

Update the existing `WorkProject` interface:

```typescript
export interface WorkProject {
    id: string;
    title: string;
    slug: string;
    mediaType: 'image' | 'video';
    mediaSrc: string | null;
    isInternal: boolean;
    externalUrl: string | null;
}
```

- [ ] **Step 2: Add ProjectSection interface**

Add below WorkProject:

```typescript
export interface ProjectSection {
    id: string;
    title: string | null;
    type: 'text_only' | 'left_image_text' | 'right_image_text' | 'image_gallery';
    content: string | null;
    image?: string;
    images?: string[];
}
```

- [ ] **Step 3: Add ProjectDetail interface**

Add below ProjectSection:

```typescript
export interface ProjectDetail {
    id: string;
    title: string;
    slug: string;
    category: {
        name: string;
        slug: string;
    };
    featuredImage: string | null;
    sections: ProjectSection[];
}
```

- [ ] **Step 4: Verify types**

No runtime test needed, TypeScript will validate during compilation.

- [ ] **Step 5: Commit types**

```bash
git add resources/js/types/project.ts
git commit -m "feat: update project TypeScript types

Add slug, isInternal, externalUrl to WorkProject
Add ProjectSection and ProjectDetail interfaces

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create Section Components

**Files:**
- Create: `resources/js/sections/project/TextOnlySection.tsx`
- Create: `resources/js/sections/project/LeftImageTextSection.tsx`
- Create: `resources/js/sections/project/RightImageTextSection.tsx`
- Create: `resources/js/sections/project/ImageGallerySection.tsx`

- [ ] **Step 1: Create project sections directory**

```bash
mkdir -p resources/js/sections/project
```

- [ ] **Step 2: Create TextOnlySection.tsx**

```typescript
import type { ProjectSection } from '@/types/project';

interface TextOnlySectionProps {
    section: ProjectSection;
}

export default function TextOnlySection({ section }: TextOnlySectionProps) {
    return (
        <div className="mx-auto max-w-prose px-5 py-12 md:px-8 md:py-16">
            {section.title && (
                <h2 className="mb-6 text-center text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                </h2>
            )}
            <div
                className="rich-content prose prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
        </div>
    );
}
```

- [ ] **Step 3: Create LeftImageTextSection.tsx**

```typescript
import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface LeftImageTextSectionProps {
    section: ProjectSection;
}

export default function LeftImageTextSection({
    section,
}: LeftImageTextSectionProps) {
    return (
        <div className="px-5 py-12 md:px-20 md:py-16 lg:px-40">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="relative aspect-square overflow-hidden rounded-lg md:rounded-3xl">
                    {section.image && (
                        <ImageWithLoader
                            src={section.image}
                            alt={section.title || 'Section image'}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    {section.title && (
                        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                            {section.title}
                        </h2>
                    )}
                    <div
                        className="rich-content prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: section.content || '' }}
                    />
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 4: Create RightImageTextSection.tsx**

```typescript
import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface RightImageTextSectionProps {
    section: ProjectSection;
}

export default function RightImageTextSection({
    section,
}: RightImageTextSectionProps) {
    return (
        <div className="px-5 py-12 md:px-20 md:py-16 lg:px-40">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center">
                    {section.title && (
                        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                            {section.title}
                        </h2>
                    )}
                    <div
                        className="rich-content prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: section.content || '' }}
                    />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-lg md:rounded-3xl">
                    {section.image && (
                        <ImageWithLoader
                            src={section.image}
                            alt={section.title || 'Section image'}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 5: Create ImageGallerySection.tsx**

```typescript
import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface ImageGallerySectionProps {
    section: ProjectSection;
}

export default function ImageGallerySection({
    section,
}: ImageGallerySectionProps) {
    return (
        <div className="px-5 py-12 md:px-20 md:py-16 lg:px-40">
            {section.title && (
                <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                </h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                {section.images?.map((image, index) => (
                    <div
                        key={`${section.id}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-lg md:rounded-2xl"
                    >
                        <ImageWithLoader
                            src={image}
                            alt={`${section.title || 'Gallery'} image ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 6: Commit section components**

```bash
git add resources/js/sections/project/
git commit -m "feat: add project section components

Create TextOnlySection, LeftImageTextSection, RightImageTextSection, ImageGallerySection
Use ImageWithLoader for lazy loading and smooth transitions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Create Project Page

**Files:**
- Create: `resources/js/pages/project.tsx`

- [ ] **Step 1: Create project.tsx page**

```typescript
import { Head, Link } from '@inertiajs/react';

import ImageGallerySection from '@/sections/project/ImageGallerySection';
import LeftImageTextSection from '@/sections/project/LeftImageTextSection';
import RightImageTextSection from '@/sections/project/RightImageTextSection';
import TextOnlySection from '@/sections/project/TextOnlySection';
import type { ProjectDetail } from '@/types/project';

interface ProjectProps {
    project: ProjectDetail;
}

export default function Project({ project }: ProjectProps) {
    return (
        <>
            <Head title={project.title} />

            <div className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                    {project.featuredImage && (
                        <img
                            src={project.featuredImage}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end px-5 pb-12 md:px-20 md:pb-16 lg:px-40">
                        {/* Breadcrumbs */}
                        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-300">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                Home
                            </Link>
                            <span>/</span>
                            <Link
                                href="/work"
                                className="transition-colors hover:text-white"
                            >
                                Work
                            </Link>
                            <span>/</span>
                            <span className="text-purple-400">
                                {project.category.name}
                            </span>
                        </nav>

                        {/* Title and Category */}
                        <h1 className="font-special-gothic-expanded text-[clamp(2rem,8vw,6rem)] uppercase leading-none">
                            {project.title}
                        </h1>
                        <div className="mt-4 inline-flex">
                            <span className="rounded-full border border-purple-500/50 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
                                {project.category.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-0">
                    {project.sections.map((section) => {
                        switch (section.type) {
                            case 'text_only':
                                return (
                                    <TextOnlySection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'left_image_text':
                                return (
                                    <LeftImageTextSection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'right_image_text':
                                return (
                                    <RightImageTextSection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'image_gallery':
                                return (
                                    <ImageGallerySection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </>
    );
}
```

- [ ] **Step 2: Add rich content styles**

Check if `@tailwindcss/typography` is installed:

```bash
npm list @tailwindcss/typography
```

If not installed:

```bash
npm install -D @tailwindcss/typography
```

Add to `tailwind.config.js` plugins array:

```javascript
plugins: [
    require('@tailwindcss/typography'),
    // ... other plugins
],
```

- [ ] **Step 3: Test page (will work after route is added)**

We'll test after adding the route in next task.

- [ ] **Step 4: Commit project page**

```bash
git add resources/js/pages/project.tsx tailwind.config.js package.json package-lock.json
git commit -m "feat: add project detail page

Create hero section with featured image, title, breadcrumbs
Render sections dynamically based on type
Add typography plugin for rich text styling

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Add Project Route

**Files:**
- Modify: `routes/web.php`

- [ ] **Step 1: Add project show route**

Add after the existing work route:

```php
Route::get('/work/{project:slug}', [ProjectController::class, 'show'])
    ->name('projects.show');
```

Ensure ProjectController is imported at top:

```php
use App\Http\Controllers\ProjectController;
```

- [ ] **Step 2: Test route**

1. Create a test project in Filament with at least one section
2. Visit `/work/{project-slug}` in browser
3. Verify page renders with hero and sections

Expected: Project page displays correctly

- [ ] **Step 3: Commit route**

```bash
git add routes/web.php
git commit -m "feat: add project show route

Enable internal project detail pages via /work/{slug}

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Update Work Page for Routing

**Files:**
- Modify: `resources/js/sections/work/OurWorkSection.tsx`

- [ ] **Step 1: Update ProjectCard component**

Replace the `ProjectCard` component (starting around line 89):

```typescript
function ProjectCard({ project, loaded, onLoad }: ProjectCardProps) {
    const CardContent = () => (
        <>
            {project.mediaSrc ? (
                <>
                    {!loaded && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        </div>
                    )}
                    {project.mediaType === 'video' ? (
                        <video
                            src={project.mediaSrc}
                            className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedData={onLoad}
                        />
                    ) : (
                        <img
                            src={project.mediaSrc}
                            alt={project.title}
                            className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                            loading="lazy"
                            onLoad={onLoad}
                        />
                    )}
                </>
            ) : (
                <div className="h-full w-full bg-white/5" />
            )}

            <button
                type="button"
                className="absolute right-2 top-2 z-30 cursor-pointer rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[10px] font-light text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 md:right-3 md:top-3 md:px-2.5 md:py-1.5 md:text-xs"
            >
                View More
            </button>

            <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-purple-900/40 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">
                    {project.title}
                </h3>
            </div>
        </>
    );

    const cardClasses =
        'group relative aspect-square overflow-hidden rounded-lg border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_12px_35px_rgba(147,51,234,0.4)] md:rounded-3xl';

    if (project.isInternal) {
        return (
            <Link href={`/work/${project.slug}`} className={cardClasses}>
                <CardContent />
            </Link>
        );
    }

    return (
        <a
            href={project.externalUrl || '#'}
            target="_self"
            className={cardClasses}
        >
            <CardContent />
        </a>
    );
}
```

Add Link import at top if not already present:

```typescript
import { router, Link } from '@inertiajs/react';
```

- [ ] **Step 2: Test work page routing**

1. Open `/work` page
2. Create one internal project and one external project in Filament
3. Click internal project card → should navigate to `/work/{slug}`
4. Click external project card → should navigate to external URL

Expected: Both routing types work correctly

- [ ] **Step 3: Commit work page update**

```bash
git add resources/js/sections/work/OurWorkSection.tsx
git commit -m "feat: add conditional routing to work page project cards

Internal projects link to /work/{slug}
External projects link to external_url
Maintain existing card styling and hover effects

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Manual Testing & Verification

**No code changes - this is a manual testing checklist**

- [ ] **Step 1: Backend Testing**

Open browser and Filament admin:

1. Navigate to `/admin/projects/create`
2. Create new project with title "Test Internal Project"
3. Set as internal (default)
4. Save project
5. Edit project → navigate to "Project Sections" tab
6. Create TextOnly section with title "About This Project" and some content
7. Create LeftImageText section with title "The Challenge", content, and image
8. Create ImageGallery section with title "Gallery" and 3+ images
9. Reorder sections via drag-and-drop
10. Toggle one section to inactive
11. Save and verify

Expected: All CRUD operations work, reordering persists, inactive section doesn't show on frontend

- [ ] **Step 2: Frontend Project Page Testing**

1. Visit `/work/test-internal-project`
2. Verify hero shows featured image, title, category
3. Verify breadcrumbs work
4. Verify all active sections render
5. Verify inactive section doesn't render
6. Verify section order matches admin
7. Test responsive layouts (mobile, tablet, desktop)
8. Check browser console for errors

Expected: Page renders correctly, no errors, responsive works

- [ ] **Step 3: External Project Testing**

1. Create new project "External Project Test"
2. Set is_internal to false
3. Enter external URL: `https://example.com`
4. Save
5. Go to `/work` page
6. Click the external project card
7. Verify it navigates to example.com in same tab

Expected: External routing works

- [ ] **Step 4: Work Page Integration**

1. Visit `/work` page
2. Test category filtering
3. Click internal project cards → should go to detail page
4. Use browser back button
5. Click external project cards → should go to external URL
6. Verify all styling intact

Expected: Both routing types work, no visual regressions

- [ ] **Step 5: Edge Cases**

1. Create project with zero sections (just hero)
2. Visit detail page → should show hero only
3. Create section with very long title
4. Create gallery with 20+ images
5. Test with no featured image
6. Test rich text with headings, lists, links

Expected: Edge cases handled gracefully

- [ ] **Step 6: Performance**

1. Open DevTools Network tab
2. Navigate to project page
3. Verify webp images served
4. Check image lazy loading works
5. Verify no N+1 queries in Laravel debugbar (if installed)

Expected: Images optimized, lazy loading works

- [ ] **Step 7: Final verification**

Run through the spec's success criteria:

1. ✓ Admins can create projects with multiple ordered sections
2. ✓ Each section type renders correctly
3. ✓ Images optimized (webp) and load performantly
4. ✓ Internal projects display dynamic pages
5. ✓ External projects link correctly
6. ✓ Work page cards support both routing types
7. ✓ UI matches existing branding
8. ✓ No performance degradation
9. ✓ Filament CRUD works smoothly
10. ✓ No breaking changes to existing structure

- [ ] **Step 8: Documentation**

If all tests pass, update any relevant documentation or README files with information about the new project sections feature.

---

## Self-Review Checklist

**Spec coverage:**
- ✓ Database migrations for projects and project_sections
- ✓ SectionType enum with four types
- ✓ ProjectSection model with media collections
- ✓ Project model relationship and cast
- ✓ ProjectForm with Project Type tab
- ✓ ProjectSectionsRelationManager with modal forms
- ✓ ProjectController show method
- ✓ WorkProjectResource with new fields
- ✓ TypeScript types (WorkProject, ProjectSection, ProjectDetail)
- ✓ Four section components (Text, LeftImage, RightImage, Gallery)
- ✓ Project detail page with hero
- ✓ Work page routing updates
- ✓ Project show route

**Placeholder scan:**
- No TBDs, TODOs, or incomplete sections
- All code blocks contain actual implementation
- All test commands specify expected output
- No "add appropriate error handling" without specifics
- No "similar to Task N" references

**Type consistency:**
- SectionType enum values consistent throughout (text_only, left_image_text, etc.)
- Media collection names consistent (section-single-image, section-gallery-images)
- Relationship names consistent (sections, project)
- Scope names consistent (ordered(), active())
- Interface field names consistent (isInternal, externalUrl in camelCase for TS)

**All requirements met:**
- ✓ Reorderable sections (drag-and-drop in Filament)
- ✓ Optional section titles
- ✓ No limit on gallery images
- ✓ Gallery has no text content
- ✓ Project pages have hero with title + category + featured image
- ✓ Projects can have zero sections
- ✓ External links open in same tab
- ✓ Rich editor output has clean minimal styling
- ✓ Sections have individual is_active toggles
- ✓ Section editing uses modal forms

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-04-project-sections.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
