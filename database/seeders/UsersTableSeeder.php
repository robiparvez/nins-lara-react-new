<?php

namespace Database\Seeders;

use App\Group;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = new User();
        $superAdmin->group_id = Group::where('name', 'Super Admin')->first()->id;
        $superAdmin->first_name = 'admin';
        $superAdmin->email = 'admin@admin.com';
        $superAdmin->password = Hash::make('password123');
        $superAdmin->save();
    }
}
