<?php

namespace App\Models;

use Database\Factories\ProgramFactory;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[Guarded(['id', 'created_at', 'updated_at'])]
class Program extends Model implements HasMedia
{
    /** @use HasFactory<ProgramFactory> */
    use HasFactory;

    use HasSlug;
    use InteractsWithMedia;

    public const IMAGE_COLLECTION = 'program-images';

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
            'features' => 'array',
            'have_cta' => 'boolean',
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
        return $query->orderBy('id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::IMAGE_COLLECTION)
            ->useDisk('public');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('webp')
            ->format('webp')
            ->quality(20)
            ->nonQueued();
    }
}
