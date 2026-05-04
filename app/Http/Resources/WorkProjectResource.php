<?php

namespace App\Http\Resources;

use App\Enums\ProjectMediaType;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @mixin Project
 */
class WorkProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $media = $this->relationLoaded('media') ? $this->media : collect();
        $isImage = $this->media_type === ProjectMediaType::Image;
        $collection = $isImage ? Project::IMAGE_COLLECTION : Project::VIDEO_COLLECTION;

        $mediaItem = $media
            ->first(fn (Media $item): bool => $item->collection_name === $collection);

        $mediaSrc = null;
        if ($mediaItem) {
            $mediaSrc = $isImage && $mediaItem->hasGeneratedConversion('webp')
                ? $mediaItem->getUrl('webp')
                : $mediaItem->getUrl();
        }

        return [
            'id' => $this->slug,
            'title' => $this->title,
            'slug' => $this->slug,
            'mediaType' => $this->media_type->value,
            'mediaSrc' => $mediaSrc,
            'isInternal' => $this->is_internal,
            'externalUrl' => $this->external_url,
        ];
    }
}
