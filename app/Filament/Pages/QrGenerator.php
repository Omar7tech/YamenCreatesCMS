<?php

namespace App\Filament\Pages;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ViewField;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class QrGenerator extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-qr-code';

    protected string $view = 'filament.pages.qr-generator';

    protected static \UnitEnum|string|null $navigationGroup = 'Tools';

    protected static ?int $navigationSort = 100;

    protected static ?string $title = 'QR Code Generator';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'qr_url' => '',
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('qr_url')
                    ->label('Enter URL')
                    ->url()
                    ->required()
                    ->placeholder('https://example.com')
                    ->live(debounce: 500)
                    ->columnSpanFull(),

                ViewField::make('qr_preview')
                    ->label('QR Code Preview')
                    ->view('filament.forms.components.qr-preview')
                    ->visible(fn ($get) => filled($get('qr_url')))
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('download')
                ->label('Download QR Code')
                ->icon('heroicon-o-arrow-down-tray')
                ->disabled(fn () => empty($this->data['qr_url']))
                ->action(function () {
                    $url = $this->data['qr_url'];

                    $qrCode = \LaraZeus\Qr\Facades\Qr::render(
                        data: $url,
                        downloadable: false
                    );

                    $this->dispatch('download-qr', qrData: $qrCode);

                    Notification::make()
                        ->title('QR Code ready to download')
                        ->success()
                        ->send();
                }),
        ];
    }
}
