<?php

namespace App\Console\Commands;

use App\Permission;
use Illuminate\Console\Command;

class CreatePermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:permission {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new permission for our application.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $permissionName = $this->argument('name');

        if (Permission::where('name', $permissionName)->first()) {
            $this->error('The permission name already exists!');
            return 0;
        }

        $permission = new Permission();
        $permission->name = $permissionName;
        $permission->save();

        $this->info('A new permission has been created successfully!');
    }
}
