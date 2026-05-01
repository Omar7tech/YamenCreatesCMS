<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public ?array $social_media;
    public ?array $contact_email;
    public ?array $contact_phone;

    public static function group(): string
    {
        return 'general';
    }
}