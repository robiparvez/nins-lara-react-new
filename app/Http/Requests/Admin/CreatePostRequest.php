<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
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
            'title'            => 'required|string|min:10|max:160|unique:posts',
            'content'          => 'required|string|min:10|max:16000000',
            'image'            => 'required|image|mimes:jpeg,png,jpg,bmp|max:1999',
            'meta_title'       => 'required|string|min:10|max:120',
            'meta_description' => 'required|string|min:10|max:255',
            'categories'       => 'required',
            'categories.*'     => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'categories.*'         => 'Category is required.',
            'categories.*.numeric' => 'Category is required.',
        ];
    }
}
