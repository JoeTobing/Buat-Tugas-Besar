<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NegotiationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'offered_price' => (float) $this->offered_price,
            'message' => $this->message,
            'status' => $this->status,
            'sender' => new UserResource($this->whenLoaded('sender')),
            'sender_id' => $this->sender_id,
            'created_at' => $this->created_at,
        ];
    }
}
