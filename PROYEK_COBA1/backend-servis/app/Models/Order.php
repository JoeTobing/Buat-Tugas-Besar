<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'technician_id',
        'category',
        'device_model',
        'problem_description',
        'service_type',
        'address',
        'latitude',
        'longitude',
        'status',
        'agreed_price',
        'cancellation_reason',
        'cancelled_by',
        'completed_at',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'agreed_price' => 'decimal:2',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    // Relationships
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }

    public function photos()
    {
        return $this->hasMany(OrderPhoto::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function negotiations()
    {
        return $this->hasMany(Negotiation::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }
}
