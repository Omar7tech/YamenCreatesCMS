<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Icons\Heroicon;

enum ProjectMediaType: string implements HasColor, HasIcon, HasLabel
{
    case Image = 'image';
    case Video = 'video';

    public function getLabel(): string
    {
        return match ($this) {
            self::Image => 'Image',
            self::Video => 'Video',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Image => 'info',
            self::Video => 'warning',
        };
    }

    public function getIcon(): string|\BackedEnum|null
    {
        return match ($this) {
            self::Image => Heroicon::OutlinedPhoto,
            self::Video => Heroicon::OutlinedFilm,
        };
    }
}
