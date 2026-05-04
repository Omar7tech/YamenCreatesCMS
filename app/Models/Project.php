<?php

namespace App\Models;

use App\Enums\ProjectMediaType;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[Guarded(['id', 'created_at', 'updated_at'])]
class Project extends Model implements HasMedia
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;
    use HasSlug;
    use InteractsWithMedia;

    public const IMAGE_COLLECTION = 'project-images';
    public const VIDEO_COLLECTION = 'project-videos';

    protected $attributes = [
        'sort' => 0,
        'is_active' => true,
        'media_type' => 'image',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'media_type' => ProjectMediaType::class,
            'is_internal' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderBy('sort')
            ->orderBy('id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(ProjectSection::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::IMAGE_COLLECTION)
            ->singleFile()
            ->useDisk('public');

        $this->addMediaCollection(self::VIDEO_COLLECTION)
            ->singleFile()
            ->useDisk('public');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        if ($media?->collection_name === self::IMAGE_COLLECTION) {
            $this->addMediaConversion('webp')
                ->format('webp')
                ->quality(80)
                ->nonQueued();
        }
    }
}
