<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.social_media', []);
        $this->migrator->add('general.contact_email', []);
        $this->migrator->add('general.contact_phone', []);
    }
};
