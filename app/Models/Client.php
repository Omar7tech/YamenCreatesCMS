<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Guarded(['id'])]
class Client extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    use InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')
            ->singleFile();
    }
}
