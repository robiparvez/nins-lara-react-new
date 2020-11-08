<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GroupController extends Controller
{
    /**
     * Display all groups with pagination.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $groups = Group::orderBy('created_at', 'desc')
            ->where('name', '<>', 'Super Admin')
            ->paginate($request->input('per_page', 12));

        return response()->json([
            'groups' => $groups,
        ]);
    }

    /**
     * Store a new group to the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateNewOrExistingGroup($request);

        $group = $this->createOrUpdateGroup(
            new Group(),
            $request
        );

        return response()->json([
            'group' => $group,
        ], 201);
    }

    /**
     * Display the specified group.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::where('name', '<>', 'Super Admin')
            ->where('id', $id)
            ->firstOrFail();

        return response()->json([
            'group' => $group,
        ]);
    }

    /**
     * Update the specified group in the database.
     *
     * @param \Illuminate\Http\Request  $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validateNewOrExistingGroup($request, $id);

        $group = $this->createOrUpdateGroup(
            Group::findOrFail($id),
            $request
        );

        return response()->json([
            'group' => $group,
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param integer|null $id
     * @return void
     */
    private function validateNewOrExistingGroup(Request $request, int $id = null)
    {
        $rules = [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:190',
                'unique:groups,name' . ($id ? ",{$id}" : ''),
            ],
            'description' => 'nullable|string|min:10|max:1000',
        ];

        $messages = [
            'unique' => 'The group :attribute already exists.',
        ];

        $request->validate($rules, $messages);
    }

    /**
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \App\Group
     */
    private function createOrUpdateGroup(Group $group, Request $request)
    {
        $group->name        = $request->name;
        $group->description = $request->description;
        $group->status      = $request->filled('status') ? true : false;
        $group->save();

        return $group;
    }
}
