<?php

namespace App\Rules\Admin;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;

class NewPasswordRule implements Rule
{
    public $error = null;

    public $request = null;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!$value) {
            return true;
        }

        $min = 5;

        if (strlen($value) < $min) {
            $this->error = "The new password must be at least {$min} characters.";

            return false;
        }

        $max = 255;

        if (strlen($value) > $max) {
            $this->error = "The password may not be greater than {$max} characters.";

            return false;
        }

        if ($value && !$this->request->current_password) {
            $this->error = "The current password is required.";

            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->error;
    }
}
