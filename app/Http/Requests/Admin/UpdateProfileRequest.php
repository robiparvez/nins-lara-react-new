<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'       => 'required|string|min:3|max:50',
            'last_name'        => 'nullable|string|min:3|max:50',
            'current_password' => [
                'required_unless:new_password',
                'min:5',
                'max:255',
                function ($attribute, $value, $fail) {
                    return $this->confirmCurrentPassword(...func_get_args());
                },
            ],
            'new_password'     => 'nullable|min:5|max:255',
        ];
    }

    private function confirmCurrentPassword($attribute, $value, $fail)
    {
        if (!Hash::check($value, adminGuard()->user()->password)) {
            $fail('The ' . str_replace('_', ' ', $attribute) . ' is invalid.');
        }
    }
}
