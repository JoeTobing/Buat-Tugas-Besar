<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technician extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shop_name',
        'address',
        'latitude',
        'longitude',
        'category',
        'description',
        'base_price',
        'status',
        'verified',
        'open_time',
        'close_time',
        'rating',
        'review_count',
        'ktp_url',
        'certificate_url',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'base_price' => 'decimal:2',
            'rating' => 'decimal:2',
            'verified' => 'boolean',
            'open_time' => 'datetime',
            'close_time' => 'datetime',
        ];
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Helper methods
    public function updateRating()
    {
        $avgRating = $this->reviews()->avg('rating');
        $reviewCount = $this->reviews()->count();
        
        $this->update([
            'rating' => round($avgRating ?? 0, 2),
            'review_count' => $reviewCount,
        ]);
    }
}
