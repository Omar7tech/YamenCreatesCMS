# Project Sections Enhancement Design

**Date:** 2026-05-04  
**Status:** Approved  
**Approach:** Single table with type-specific fields

---

## Overview

Enhance the existing Projects system to support detailed internal project pages with multiple section types, while also supporting external project links. Projects can contain ordered, editable sections that display rich content including text, images, and galleries.

---

## Requirements Summary

### Core Features
- Project sections with multiple layout types
- Rich text editor for content
- Image handling via Spatie Media Library
- Internal vs external project routing
- Reorderable sections in Filament
- Individual section visibility controls

### Section Types
1. **Text Only** - Rich text content
2. **Left Image + Text** - Image on left, text on right
3. **Right Image + Text** - Image on right, text on left
4. **Image Gallery** - Multiple images, no text

### Project Behavior
- `is_internal = true`: Opens internal project page using slug
- `is_internal = false`: Links to external URL
- Projects can have zero or more sections
- External links open in same tab

---

## Database Schema

### Migration 1: Update `projects` Table

```php
Schema::table('projects', function (Blueprint $table) {
    $table->boolean('is_internal')->default(true)->after('media_type');
    $table->string('external_url')->nullable()->after('is_internal');
});
```

**Fields:**
- `is_internal` (boolean, default: true) - determines routing behavior
- `external_url` (string, nullable) - URL when is_internal = false

### Migration 2: Create `project_sections` Table

```php
Schema::create('project_sections', function (Blueprint $table) {
    $table->id();
    $table->foreignId('project_id')->constrained()->cascadeOnDelete();
    $table->enum('type', ['text_only', 'left_image_text', 'right_image_text', 'image_gallery']);
    $table->string('title')->nullable();
    $table->text('content')->nullable();
    $table->unsignedInteger('sort')->default(0)->index();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

**Fields:**
- `project_id` - foreign key to projects table, cascade on delete
- `type` - section layout type (enum)
- `title` - optional heading displayed above section content
- `content` - rich editor output (HTML), used by text-based sections
- `sort` - ordering position (reorderable via drag-and-drop)
- `is_active` - visibility toggle per section

---

## Models & Enums

### New Enum: `SectionType`

**Location:** `app/Enums/SectionType.php`

**Cases:**
- `TextOnly` → `text_only`
- `LeftImageText` → `left_image_text`
- `RightImageText` → `right_image_text`
- `ImageGallery` → `image_gallery`

**Implements:**
- `HasLabel` - human-readable labels
- `HasIcon` - Heroicons for Filament UI
- `HasColor` - color coding in Filament

**Pattern:** Follows existing `ProjectMediaType` enum structure.

### New Model: `ProjectSection`

**Location:** `app/Models/ProjectSection.php`

**Traits:**
- `InteractsWithMedia` (Spatie)

**Implements:**
- `HasMedia` (Spatie)

**Attributes:**
```php
protected $attributes = [
    'sort' => 0,
    'is_active' => true,
];
```

**Casts:**
```php
'type' => SectionType::class,
'is_active' => 'boolean',
```

**Relationships:**
```php
public function project(): BelongsTo
{
    return $this->belongsTo(Project::class);
}
```

**Scopes:**
- `ordered()` - order by sort, then id
- `active()` - where is_active = true

**Media Collections:**
1. `section-single-image` - single file, for LeftImageText and RightImageText
2. `section-gallery-images` - multiple files, for ImageGallery sections

**Media Conversions:**
- Both collections register `webp` conversion (format: webp, quality: 80)
- Stored on `public` disk
- Pattern matches existing Project model media handling

### Update: `Project` Model

**Add relationship:**
```php
public function sections(): HasMany
{
    return $this->hasMany(ProjectSection::class);
}
```

**Add cast:**
```php
'is_internal' => 'boolean'
```

---

## Filament Integration

### Update: `ProjectForm` Schema

**Add new tab:** "Project Type"

**Form fields:**
```php
Toggle::make('is_internal')
    ->label('Internal Project Page')
    ->default(true)
    ->inline(false)
    ->live(),

TextInput::make('external_url')
    ->label('External URL')
    ->url()
    ->placeholder('https://example.com')
    ->required()
    ->visibleJs("$get('is_internal') === false")
    ->helperText('Project will link to this URL when clicked'),
```

**Behavior:**
- When `is_internal` is false, show `external_url` field
- `external_url` is required when visible
- Uses Filament's reactive `visibleJs()` for conditional display

### New: `ProjectSectionsRelationManager`

**Location:** `app/Filament/Resources/Projects/RelationManagers/ProjectSectionsRelationManager.php`

**Table columns:**
- Title (displays "Untitled" if null)
- Type (badge with enum color/icon)
- Active status (toggle switch)
- Sort order (number)

**Table features:**
- Reorderable (drag handle, updates sort field)
- Default sort: by sort column, then id

**Actions:**
- Create (opens modal)
- Edit (opens modal)
- Delete
- Bulk delete
- Bulk toggle active

**Modal form fields:**

1. **Title** (TextInput, nullable)
2. **Type** (Select, required, live)
   - Options from SectionType enum
3. **Is Active** (Toggle, default true)
4. **Content** (RichEditor)
   - Visible for: TextOnly, LeftImageText, RightImageText
   - Toolbar: headings, bold, italic, lists, links
   - Uses `visibleJs()` based on type
5. **Single Image** (SpatieMediaLibraryFileUpload)
   - Visible for: LeftImageText, RightImageText
   - Collection: `section-single-image`
   - Conversion: webp
   - Max size: 6MB
   - Uses `visibleJs()` based on type
6. **Gallery Images** (SpatieMediaLibraryFileUpload)
   - Visible for: ImageGallery
   - Collection: `section-gallery-images`
   - Multiple files (no hardcoded limit)
   - Conversion: webp
   - Max size per file: 6MB
   - Reorderable
   - Uses `visibleJs()` based on type

**Validation:**
- Content required when type is text-based
- Single image required when type is LeftImageText or RightImageText
- Gallery images required when type is ImageGallery

### Register Relation Manager

**Update:** `ProjectResource::getRelations()`

```php
return [
    ProjectSectionsRelationManager::class,
];
```

---

## Frontend Implementation

### Routing

**New route:** `routes/web.php`

```php
Route::get('/work/{project:slug}', [ProjectController::class, 'show'])
    ->name('projects.show');
```

### Controller

**New method:** `ProjectController::show(Project $project)`

**Logic:**
1. Load project with relationships: `category`, `sections` (active, ordered)
2. Load project featured media (existing project card image)
3. For each section, load appropriate media:
   - LeftImageText/RightImageText: single image (webp conversion)
   - ImageGallery: all gallery images (webp conversions)
4. Transform to Inertia props structure
5. Return `Inertia::render('project', [...])`

**Data transformation:**
```typescript
{
  project: {
    id: string,
    title: string,
    slug: string,
    category: {
      name: string,
      slug: string
    },
    featuredImage: string | null, // webp URL
    sections: Array<{
      id: string,
      title: string | null,
      type: 'text_only' | 'left_image_text' | 'right_image_text' | 'image_gallery',
      content: string | null, // HTML from rich editor
      image?: string, // webp URL for single image
      images?: string[], // webp URLs for gallery
    }>
  }
}
```

### New Page: Project Detail

**Location:** `resources/js/pages/project.tsx`

**Structure:**

1. **Hero Section**
   - Full-width featured image background
   - Dark overlay gradient
   - Project title (large, uppercase, special-gothic-expanded)
   - Category badge/tag
   - Breadcrumbs: Home → Work → {Category} → {Project}

2. **Sections Container**
   - Map through sections array
   - Render appropriate component based on type
   - Consistent vertical spacing between sections

**Styling:**
- Matches existing site aesthetic (dark theme, purple accents)
- Responsive grid layouts
- Smooth transitions and hover effects

### Section Components

**Location:** `resources/js/sections/project/`

#### 1. `TextOnlySection.tsx`

**Props:** `{ title?: string, content: string }`

**Layout:**
- Optional title (h2, centered)
- Rich text content in prose container
- Max-width: prose (65ch)
- Centered on page

#### 2. `LeftImageTextSection.tsx`

**Props:** `{ title?: string, content: string, image: string }`

**Layout:**
- Two-column grid (50/50 split)
- Image on left (aspect-ratio maintained)
- Text on right (optional title + content)
- Stack vertically on mobile

#### 3. `RightImageTextSection.tsx`

**Props:** `{ title?: string, content: string, image: string }`

**Layout:**
- Two-column grid (50/50 split)
- Text on left (optional title + content)
- Image on right (aspect-ratio maintained)
- Stack vertically on mobile (text first)

#### 4. `ImageGallerySection.tsx`

**Props:** `{ title?: string, images: string[] }`

**Layout:**
- Optional title (h2, centered)
- Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Equal aspect ratios
- Click to open lightbox (optional enhancement)

**Common patterns:**
- All images use `ImageWithLoader` component (existing)
- Lazy loading for performance
- Webp format served from Spatie conversions
- Smooth fade-in on load

### Rich Text Styling

**Approach:** Clean minimal typography

**Elements styled:**
- Headings (h1-h6) - hierarchy with font sizes
- Paragraphs - readable line-height and spacing
- Lists (ul, ol) - proper indentation
- Links - underline on hover
- Bold/italic - semantic emphasis

**Implementation:**
- Tailwind's `@tailwindcss/typography` plugin, or
- Custom CSS scoped to `.rich-content` class

**No custom colors** - inherits site text colors, lets content remain neutral.

### Work Page Updates

**Update:** `resources/js/sections/work/OurWorkSection.tsx`

**Changes to `ProjectCard` component:**

1. Conditional wrapper logic:
   ```typescript
   // If internal project
   <Link href={`/work/${project.slug}`}>
     {/* existing card content */}
   </Link>
   
   // If external project
   <a href={project.externalUrl} target="_self">
     {/* existing card content */}
   </a>
   ```

2. Keep all existing hover effects, transitions, styling
3. "View More" button remains, just wraps in appropriate link

**Update TypeScript types:**

`resources/js/types/project.ts` - add to `WorkProject`:
```typescript
slug: string;
isInternal: boolean;
externalUrl: string | null;
```

**Update controller:**

`WorkController::index()` - include new fields in project transformation:
- `slug`
- `is_internal` → `isInternal` (camelCase for JS)
- `external_url` → `externalUrl`

---

## Technical Considerations

### Performance
- Webp conversions reduce image size ~30-40%
- Lazy loading prevents blocking initial render
- Gallery sections could have many images but no hardcoded limit (admin responsibility)
- Database indexes on `sort` and `is_active` for efficient queries

### Data Integrity
- Foreign key cascade delete: removing a project removes its sections
- Spatie media automatically cleaned up when model deleted
- Sort values managed by Filament's reorder action

### Validation
- URL validation for `external_url` in Filament
- Required field enforcement based on section type (conditional)
- File type and size validation via Filament file upload rules

### Extensibility
- Easy to add new section types by adding enum case + form conditionals
- Single table design keeps sections together for ordering
- JSON column not needed since fields are predictable

### Existing Patterns Followed
- Model structure matches `Project` model (sluggable, media, scopes)
- Enum follows `ProjectMediaType` pattern
- Filament resource organization (Schemas, Pages, RelationManagers folders)
- Frontend component organization by page/section
- TypeScript types in dedicated files

---

## Testing Checklist

### Backend
- [ ] Migrations run successfully
- [ ] Models relationships work (project->sections, section->project)
- [ ] Spatie media collections save/retrieve correctly
- [ ] Enum values display properly in Filament
- [ ] Section reordering updates sort field
- [ ] Active/inactive filtering works

### Filament
- [ ] Relation manager displays in Project edit page
- [ ] Modal form shows/hides fields based on type
- [ ] Drag-to-reorder updates sort field
- [ ] Image uploads work for both collections
- [ ] Rich editor saves HTML content
- [ ] Validation enforces required fields per type
- [ ] Toggle switches update is_active
- [ ] External URL field shows/hides based on is_internal

### Frontend
- [ ] Project show page renders with hero
- [ ] All section types render correctly
- [ ] Images load with lazy loading
- [ ] Responsive layouts work on mobile/tablet/desktop
- [ ] Rich text content displays properly styled
- [ ] Work page cards link to internal pages
- [ ] Work page cards link to external URLs
- [ ] External links open in same tab
- [ ] Image galleries display in grid
- [ ] Breadcrumbs navigate correctly

### Integration
- [ ] Projects with zero sections display (hero only)
- [ ] Inactive sections don't appear on frontend
- [ ] Section ordering matches admin sort order
- [ ] Webp conversions generated on upload
- [ ] No console errors in browser
- [ ] No SQL errors in Laravel logs

---

## Future Enhancements (Out of Scope)

- Lightbox/modal for gallery images
- Video embed sections
- Code block sections
- Testimonial/quote sections
- Section animations on scroll
- Draft/scheduled sections
- Section templates/presets
- A/B testing sections
- Analytics per section

---

## Success Criteria

1. Admins can create projects with multiple ordered sections
2. Each section type renders correctly with its content
3. Images are optimized (webp) and load performantly
4. Internal projects display dynamic pages
5. External projects link out correctly
6. Work page cards support both internal/external routing
7. UI matches existing site branding and quality
8. No performance degradation on work page
9. All CRUD operations work smoothly in Filament
10. Zero breaking changes to existing category/project structure
