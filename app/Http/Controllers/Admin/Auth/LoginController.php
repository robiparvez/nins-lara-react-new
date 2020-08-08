<?php

namespace App\Http\Controllers\Admin\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Create an instance of controller.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest:api')->only(['login']);
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

        if (!$token = $this->guard()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
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
        $this->guard()->logout();

        return response()->json([
            'msg' => 'You are logged out!',
        ]);
    }

    /**
     * Get the authentication guard instance.
     * 
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    private function guard()
    {
        return Auth::guard('api');
    }
}
