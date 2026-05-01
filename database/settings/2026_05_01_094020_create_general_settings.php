<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.social_media', [
            ['name' => 'Instagram', 'link' => 'https://www.instagram.com/yamencreates'],
            ['name' => 'LinkedIn', 'link' => 'https://www.linkedin.com/company/yamen-creates'],
        ]);
        $this->migrator->add('general.contact_email', [
            ['email' => 'info@yamencreates.com'],
        ]);
        $this->migrator->add('general.contact_phone', [
            ['phone' => '+961 70 075 077'],
        ]);
    }
};
