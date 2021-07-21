<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait AuthorizesUsers
{

    /**
     * Check if the authenticated user has specified
     * permission.
     *
     * @param string $permission
     * @param boolean|true $abort
     * @param string|null $guard
     * @return boolean
     */
    public function hasAccess(string $permission, bool $abort = true, $guard = null)
    {
        $access = Auth::user($guard)->hasAccess($permission);

        abort_if($abort && !$access, 403, 'Unauthorized Access.');

        return $access;
    }

    /**
     * Check if the authenticated user has any of
     * the specified permissions.
     *
     * @param array $permissions
     * @param boolean|true $abort
     * @param string|null $guard
     * @return boolean
     */
    public function hasAnyAccess(array $permissions, bool $abort = true, string $guard = null)
    {
        $access = Auth::user($guard)->hasAnyAccess($permissions);

        abort_if($abort && !$access, 403, 'Unauthorized Access.');

        return $access;
    }

    /**
     * Check if the authenticated user has all of
     * the specified permissions.
     *
     * @param array $permissions
     * @param boolean|true $abort
     * @param string|null $guard
     * @return boolean
     */
    public function hasAllAccess(array $permissions, bool $abort = true, string $guard = null)
    {
        $access = Auth::user($guard)->hasAllAccess($permissions);

        abort_if($abort && !$access, 403, 'Unauthorized Access.');

        return $access;
    }
}
