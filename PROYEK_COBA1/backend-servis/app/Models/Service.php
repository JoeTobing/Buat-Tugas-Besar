<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'technician_id',
        'name',
        'description',
        'estimated_price_min',
        'estimated_price_max',
    ];

    protected function casts(): array
    {
        return [
            'estimated_price_min' => 'decimal:2',
            'estimated_price_max' => 'decimal:2',
        ];
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }
}
