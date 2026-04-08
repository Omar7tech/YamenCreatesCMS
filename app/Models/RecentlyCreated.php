<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Guarded(['id', 'created_at', 'updated_at'])]
class RecentlyCreated extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'recently_created';

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            if ($model->sort === 0) {
                $model->sort = self::max('sort') + 1;
            }
        });
    }

    public const IMAGE_1 = 'recently-created-image-1';
    public const IMAGE_2 = 'recently-created-image-2';
    public const IMAGE_3 = 'recently-created-image-3';

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::IMAGE_1)
            ->singleFile()
            ->useDisk('public');

        $this->addMediaCollection(self::IMAGE_2)
            ->singleFile()
            ->useDisk('public');

        $this->addMediaCollection(self::IMAGE_3)
            ->singleFile()
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
