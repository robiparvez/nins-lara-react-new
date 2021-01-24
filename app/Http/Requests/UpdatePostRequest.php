<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
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
        $id = (int)$this->route('post');

        return [
            'title'            => [
                'required', 'string', 'min:10', 'max:160,', $this->uniqueTitle($id),
            ],
            'content'          => 'required|string|min:10|max:16000000',
            'image'            => 'nullable|image|mimes:jpeg,png,jpg,bmp|max:1999',
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

    private function uniqueTitle(int $id)
    {
        return Rule::unique('posts')->ignore($id);
    }
}
