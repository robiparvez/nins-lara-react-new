<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Permission;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    /**
     * Display all the permissions.
     *
     * @param integer $id group id
     * @return void
     */
    public function index(int $id)
    {
        $group = Group::findOrFail($id);

        $groupPermissions = $group->permissions()
            ->select(['id'])
            ->get();

        $permissions = Permission::select([
            'id', 'name',
        ])->get();

        foreach ($permissions as $permission) {
            $groupPermission = $groupPermissions->where('id', $permission->id)
                ->first();

            $permission->setAttribute(
                'has_permission',
                $groupPermission ? true : false
            );
        }

        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    /**
     * Assign permissions to the specified group.
     *
     * @param \Illuminate\Http\Request $request
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function assignPermissionsToGroup(Request $request, int $id)
    {
        $group = Group::findOrFail($id);

        $selectedPermissions = $request->input('permissions', []);

        $group->permissions()
            ->sync($selectedPermissions);

        $permissions = Permission::select(['id', 'name'])
            ->whereIn('id', $selectedPermissions)
            ->get();

        return response()->json([
            'permissions' => $permissions,
            'message'     => 'Selected permissions have been assigned to the specified group.',
        ]);
    }
}
