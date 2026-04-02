<?php

namespace App\Http\Resources;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @mixin Program
 */
class WorkProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'title' => $this->title,
            'description' => $this->subtitle ?? '',
            'hasCta' => $this->have_cta,
            'buttonText' => $this->cta_text ?: "Let's Talk",
            'buttonUrl' => $this->cta_url,
            'bulletPoints' => $this->flattenRepeaterItems($this->bullets, 'bullet'),
            'tags' => $this->flattenRepeaterItems($this->features, 'feature'),
            'images' => $this->programImages(),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>|null  $items
     * @return array<int, string>
     */
    private function flattenRepeaterItems(?array $items, string $key): array
    {
        return collect($items)
            ->map(fn (mixed $item): ?string => is_array($item) ? ($item[$key] ?? null) : null)
            ->filter(fn (?string $value): bool => filled($value))
            ->values()
            ->all();
    }

    /**
     * @return array<int, array{src: string, alt: string}>
     */
    private function programImages(): array
    {
        $media = $this->relationLoaded('media')
            ? $this->media
            : collect();

        return $media
            ->filter(fn (Media $item): bool => $item->collection_name === Program::IMAGE_COLLECTION)
            ->sortBy('order_column')
            ->values()
            ->map(function (Media $item, int $index): array {
                return [
                    'src' => $item->hasGeneratedConversion('webp')
                        ? $item->getUrl('webp')
                        : $item->getUrl(),
                    'alt' => sprintf('%s Program %d', $this->title, $index + 1),
                ];
            })
            ->all();
    }
}
