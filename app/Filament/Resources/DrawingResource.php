<?php

namespace App\Filament\Resources;

use MuhammadKazimSadiq\FilamentCanvas\Resources\DrawingResource as BaseDrawingResource;
use UnitEnum;

class DrawingResource extends BaseDrawingResource
{
    protected static UnitEnum|string|null $navigationGroup = 'Studio';
}
