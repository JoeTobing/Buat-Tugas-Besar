<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Negotiation extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'sender_id',
        'offered_price',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'offered_price' => 'decimal:2',
        ];
    }

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
