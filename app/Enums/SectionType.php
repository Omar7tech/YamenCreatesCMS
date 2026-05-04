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
