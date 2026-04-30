<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded(['id', 'created_at', 'updated_at'])]
class Spreadsheet extends Model
{
    protected function casts(): array
    {
        return [
            'data' => 'json',
        ];
    }
}

