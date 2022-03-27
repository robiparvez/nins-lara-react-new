<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Seeder;

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
        $superAdmin->first_name = 'parvez';
        $superAdmin->last_name = 'robi';
        $superAdmin->email = 'parvezrobi@yahoo.com';
        $superAdmin->password = \Hash::make('12345678');
        $superAdmin->save();
    }
}
