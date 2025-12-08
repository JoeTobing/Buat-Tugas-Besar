<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'estimated_price_min' => $this->estimated_price_min ? (float) $this->estimated_price_min : null,
            'estimated_price_max' => $this->estimated_price_max ? (float) $this->estimated_price_max : null,
        ];
    }
}
