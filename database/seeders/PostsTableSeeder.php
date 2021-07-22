<?php

namespace Database\Seeders;

use App\Category;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Post::class, 30)->create()->each(function ($post) {
            $post->categories()->saveMany(Category::inRandomOrder()->take(5)->get());
        });
    }
}
