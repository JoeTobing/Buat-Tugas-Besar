<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'device_model' => $this->device_model,
            'problem_description' => $this->problem_description,
            'service_type' => $this->service_type,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'status' => $this->status,
            'agreed_price' => $this->agreed_price ? (float) $this->agreed_price : null,
            'cancellation_reason' => $this->cancellation_reason,
            'cancelled_by' => $this->cancelled_by,
            'completed_at' => $this->completed_at,
            'cancelled_at' => $this->cancelled_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'customer' => new UserResource($this->whenLoaded('customer')),
            'technician' => new TechnicianResource($this->whenLoaded('technician')),
            'photos' => OrderPhotoResource::collection($this->whenLoaded('photos')),
            'payment' => new PaymentResource($this->whenLoaded('payment')),
            'review' => new ReviewResource($this->whenLoaded('review')),
        ];
    }
}
