<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNegotiationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'offered_price' => 'required|numeric|min:0',
            'message' => 'nullable|string',
        ];
    }
}
