<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'position',
        'priority',
        'tags',
        'assignee',
        'progress',
        'estimated_hours',
    ];

    protected $casts = [
        'due_date' => 'date',
        'position' => 'decimal:10',
        'tags' => 'array',
        'progress' => 'integer',
        'estimated_hours' => 'integer',
    ];
}
