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
