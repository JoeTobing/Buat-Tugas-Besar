<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'attachment_url' => $this->attachment_url,
            'sender' => new UserResource($this->whenLoaded('sender')),
            'sender_id' => $this->sender_id,
            'created_at' => $this->created_at,
        ];
    }
}
