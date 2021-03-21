<?php

namespace App\Http\Requests\Admin;

use Illuminate\Http\Request;
use App\Rules\Admin\NewPasswordRule;
use Illuminate\Foundation\Http\FormRequest;

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
    public function rules(Request $request)
    {
        return [
            'first_name'       => 'required|string|min:3|max:50',
            'last_name'        => 'nullable|string|min:3|max:50',
            'current_password' => 'nullable|min:5|max:255|password:api',
            'new_password'     => [new NewPasswordRule($request)],
        ];
    }
}
