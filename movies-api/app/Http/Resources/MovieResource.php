<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'excerpt' => $this->excerpt,
            'thumbnail' => $this->whenLoaded('media', fn() => $this->getFirstMediaUrl('thumbnail')),
            'chairs' => $this->whenLoaded('chairs', fn() =>  ChairResource::collection($this->chairs)),
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'unbooked_chairs' => $this->whenLoaded('chairs', fn() => $this->chairs_count),
        ];
    }
}
