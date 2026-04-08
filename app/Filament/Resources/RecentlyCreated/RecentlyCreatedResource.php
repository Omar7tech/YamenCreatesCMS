<?php

namespace App\Filament\Resources\RecentlyCreated;

use App\Filament\Resources\RecentlyCreated\Pages\CreateRecentlyCreated;
use App\Filament\Resources\RecentlyCreated\Pages\EditRecentlyCreated;
use App\Filament\Resources\RecentlyCreated\Pages\ListRecentlyCreated;
use App\Filament\Resources\RecentlyCreated\Pages\ViewRecentlyCreated;
use App\Filament\Resources\RecentlyCreated\Schemas\RecentlyCreatedForm;
use App\Filament\Resources\RecentlyCreated\Schemas\RecentlyCreatedInfolist;
use App\Filament\Resources\RecentlyCreated\Tables\RecentlyCreatedTable;
use App\Models\RecentlyCreated;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RecentlyCreatedResource extends Resource
{
    protected static ?string $model = RecentlyCreated::class;

    protected static ?string $modelLabel = 'Recently Created';

    protected static ?string $pluralModelLabel = 'Recently Created';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleGroup;

    protected static \UnitEnum|string|null $navigationGroup = 'Home';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return RecentlyCreatedForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return RecentlyCreatedInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RecentlyCreatedTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRecentlyCreated::route('/'),
            'create' => CreateRecentlyCreated::route('/create'),
            'view' => ViewRecentlyCreated::route('/{record}'),
            'edit' => EditRecentlyCreated::route('/{record}/edit'),
        ];
    }
}
