<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Admin\UpdateProfileRequest;

class ProfileController extends Controller
{
    /**
     * Create an instance of controller.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display the current user profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = adminGuard()->user();

        $permissions = $user->group
            ->permissions()
            ->select(['id', 'name'])
            ->get();

        return response()->json([
            'user'        => $user,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the current user profile.
     *
     * @param \App\Http\Requests\Admin\UpdateProfileRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfileRequest $request)
    {
        $user = adminGuard()->user();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;

        if ($request->new_password) {
            $user->password = Hash::make($request->new_password);
        }

        $user->save();

        return response()->json([
            'user'    => $user,
            'message' => 'Your profile has been updated.',
        ]);
    }
}
