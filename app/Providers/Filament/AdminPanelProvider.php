<?php

namespace App\Providers\Filament;

use DiogoGPinto\AuthUIEnhancer\AuthUIEnhancerPlugin;
use Filament\FontProviders\GoogleFontProvider;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Enums\Width;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Hammadzafar05\MobileBottomNav\MobileBottomNav;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Awcodes\LightSwitch\LightSwitchPlugin;
use MmesDesign\FilamentFileManager\FileManagerPlugin;
use MuhammadKazimSadiq\FilamentCanvas\FilamentCanvasPlugin;
use Qalainau\UniverSheet\UniverSheetPlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->spa(hasPrefetching: true)
            ->id('admin')
            ->path('admin')
            ->viteTheme('resources/css/filament/admin/theme.css')
            ->login()
            ->colors([
                'primary' => Color::Violet,
            ])
            ->sidebarCollapsibleOnDesktop()
            
            ->profile(isSimple:true)
            ->broadcasting(false)
            ->unsavedChangesAlerts()
            ->databaseTransactions()
            ->maxContentWidth(Width::Full)
            ->font('Bricolage Grotesque', provider: GoogleFontProvider::class)
            ->brandLogo(asset('logo/yamenlogodark.svg'))
            ->darkModeBrandLogo(asset('logo/yamenlogo.svg'))
            ->broadcasting(false)

            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
                \App\Filament\Pages\TaskBoard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->viteTheme('resources/css/filament/admin/theme.css')
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                AuthUIEnhancerPlugin::make()
                    ->emptyPanelBackgroundColor(Color::hex('#f0f0f0'))
                    ->showEmptyPanelOnMobile(false)
                    ->emptyPanelBackgroundImageUrl(asset('biglogo.jpg')),
                LightSwitchPlugin::make(),
                MobileBottomNav::make(),
                UniverSheetPlugin::make(),
                FileManagerPlugin::make(),
                FilamentCanvasPlugin::make()
            ]);
    }
}
