<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AboutResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image' => $this->image,
            'description_1' => $this->description_1,
            'description_2' => $this->description_2,
            'description_3' => $this->description_3,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
