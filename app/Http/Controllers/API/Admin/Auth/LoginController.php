<?php

namespace App\Http\Controllers\API\Admin\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Create an instance of controller.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api')->only(['logout']);
    }

    /**
     * Login users by issuing jwt tokens.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email|exists:users|min:2|max:191',
            'password' => 'required|string|min:2|max:191',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = adminGuard()->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['These credentials do not match our records.'],
            ]);
        }

        return response()->json([
            'token' => $token,
            'msg'   => 'You are logged in!',
        ]);
    }

    /**
     * Logout the users from the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        adminGuard()->logout();

        return response()->json([
            'msg' => 'You are logged out!',
        ]);
    }
}
