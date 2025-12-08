<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TechnicianResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'shop_name' => $this->shop_name,
            'name' => $this->whenLoaded('user') ? $this->user->name : null, // Tambahkan nama user
            'category' => $this->category,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'status' => $this->status,
            'rating' => (float) $this->rating,
            'review_count' => $this->review_count,
            'base_price' => $this->base_price ? (float) $this->base_price : null,
            'description' => $this->description,
            'verified' => $this->verified,
            'open_time' => $this->open_time,
            'close_time' => $this->close_time,
            'ktp_url' => $this->ktp_url,
            'certificate_url' => $this->certificate_url,
            'user' => new UserResource($this->whenLoaded('user')),
            'services' => ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
