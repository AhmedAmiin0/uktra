<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateChairRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check() && Auth::user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'price' => 'required|float',
            'row' => 'required|integer',
            'column' => 'required|integer |unique:chairs,column,NULL,id,row,' . $this->row,
            'movie_id' => 'required|integer',
            'user_id' => 'nullable|integer',
        ];
    }
}
