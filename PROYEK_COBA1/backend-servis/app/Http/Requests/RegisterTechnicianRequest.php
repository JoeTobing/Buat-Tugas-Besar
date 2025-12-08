<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterTechnicianRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'shop_name' => 'required|string|max:255',
            'address' => 'required|string',
            'category' => 'required|in:COMPUTER,SMARTPHONE,HOME_APPLIANCE,OTHER',
            'description' => 'nullable|string',
            'base_price' => 'nullable|numeric|min:0',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'ktp' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120', // Max 5MB
            'certificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120', // Max 5MB, optional
        ];
    }
}
