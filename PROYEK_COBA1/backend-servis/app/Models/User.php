<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'profile_photo_url',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function technician()
    {
        return $this->hasOne(Technician::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }

    public function chats()
    {
        return $this->hasMany(Chat::class, 'sender_id');
    }

    public function negotiations()
    {
        return $this->hasMany(Negotiation::class, 'sender_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'customer_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // Helper methods
    public function isCustomer(): bool
    {
        return $this->role === 'CUSTOMER';
    }

    public function isTechnician(): bool
    {
        return $this->role === 'TECHNICIAN';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'ADMIN';
    }
}
