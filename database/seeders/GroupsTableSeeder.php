<?php

namespace Database\Seeders;

use App\Group;
use Illuminate\Database\Seeder;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminGroup = new Group();
        $superAdminGroup->name = 'Super Admin';
        $superAdminGroup->description = 'Super admin that can do anything.';
        $superAdminGroup->save();

        $adminGroup = new Group();
        $adminGroup->name = 'Admin';
        $adminGroup->description = 'A simple admin group that has permissions given by the super admin';
        $adminGroup->save();
    }
}
