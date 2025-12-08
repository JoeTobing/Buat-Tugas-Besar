<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:CASH,TRANSFER,EWALLET,OTHER',
            'status' => 'required|in:UNPAID,PAID,FAILED,REFUNDED',
            'transaction_ref' => 'nullable|string|max:255',
        ];
    }
}
