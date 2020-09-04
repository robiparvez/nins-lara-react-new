<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::all();

        return response()->json([
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::findOrFail($id);

        return response()->json([
            'group' => $group,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Validate create or update group request.
     *
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
            ]
        ];

        $messages = [
            'unique' => 'The group :attribute already exists.',
        ];

        $request->validate($rules, $messages);
    }

    /**
     * Create a new group or update an existing one.
     *
     * @param \App\Group $group
     * @param \Illuminate\Http\Request $request
     * @return \App\Group
     */
    private function createOrUpdateGroup(Group $group, Request $request)
    {
        $group->name = $request->name;
        $group->status = $request->filled('status') ? true : false;
        $group->save();

        return $group;
    }
}
