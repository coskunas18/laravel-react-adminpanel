<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:300|unique:users,name,' . $this->route('user')->id,
            'email' => 'email|unique:users,email,' . $this->route('user')->id,
            'telephone' => 'max:20|string',
            "image" => 'nullable|string',
            "status" => 'required',
        ];
    }
}
