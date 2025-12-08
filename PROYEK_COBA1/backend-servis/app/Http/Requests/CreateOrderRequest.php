<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'technician_id' => 'nullable|exists:technicians,id',
            'category' => 'required|in:COMPUTER,SMARTPHONE,HOME_APPLIANCE,OTHER',
            'device_model' => 'nullable|string|max:255',
            'problem_description' => 'required|string',
            'service_type' => 'required|in:AT_SHOP,HOME_SERVICE',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|string',
        ];
    }
}
