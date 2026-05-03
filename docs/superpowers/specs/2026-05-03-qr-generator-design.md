# QR Code Generator Page Design

**Date:** 2026-05-03  
**Status:** Approved

## Overview

Simple QR code generator page in Filament admin panel. User enters URL, sees live QR preview, customizes appearance, downloads image.

## Requirements

- Filament custom page (no database/CRUD)
- URL input with validation
- Live QR code preview
- Customization UI (colors, size, style)
- Download as PNG/SVG
- Integrate with existing Filament navigation

## Architecture

### Components

**QrGenerator Page** (`app/Filament/Pages/QrGenerator.php`)
- Extends `Filament\Pages\Page`
- Form with URL input field
- Uses `\LaraZeus\Qr\Components\Qr` component
- Download action

### Data Flow

1. User enters URL in text input
2. Livewire reactive state updates
3. QR component renders preview with current options
4. User clicks "Customize" - slide-over opens with style options
5. User clicks "Download" - action generates QR image, triggers browser download

### UI Structure

```
┌─────────────────────────────────────┐
│  QR Code Generator                   │
├─────────────────────────────────────┤
│  Enter URL:                          │
│  [https://example.com         ]      │
│                                      │
│  ┌─────────────────┐                │
│  │                 │                │
│  │   QR Preview    │                │
│  │                 │                │
│  └─────────────────┘                │
│                                      │
│  [Customize] [Download]              │
└─────────────────────────────────────┘
```

## Implementation Details

### File: `app/Filament/Pages/QrGenerator.php`

- Protected property `$qr_url` for URL state
- Protected property `$qr_options` for customization state (array)
- `form()` method returns schema with Qr component
- `downloadAction()` generates QR using `\LaraZeus\Qr\Facades\Qr::render()`
- Navigation: icon `heroicon-o-qr-code`, group "Tools", sort order 100

### Navigation Registration

Add to Filament panel provider or page:
```php
protected static ?string $navigationIcon = 'heroicon-o-qr-code';
protected static ?string $navigationGroup = 'Tools';
protected static ?int $navigationSort = 100;
protected static string $view = 'filament.pages.qr-generator';
```

### Blade View

Minimal - Filament handles form rendering. Just container for form.

## Success Criteria

- Page accessible at `/admin/qr-generator`
- URL input validates (required, URL format)
- QR code displays after URL entered
- Customization slide-over opens/closes correctly
- Download action produces valid QR image
- No PHP/JavaScript errors
- Matches Filament UI patterns

## Non-Requirements

- Database storage
- QR code history
- User-specific saved QR codes
- Batch generation
- API endpoints

## Testing

Manual testing:
1. Navigate to page
2. Enter valid URL - QR appears
3. Enter invalid URL - validation error
4. Customize colors/size - QR updates
5. Download - file downloads, opens correctly
6. Try various URL types (http, https, long, short)
