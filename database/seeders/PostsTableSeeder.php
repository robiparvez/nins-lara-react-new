<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Category;
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
        /* factory(Post::class, 30)->create()->each(function ($post) {
            $post->categories()->saveMany(Category::inRandomOrder()->take(5)->get());
        }); */

        Post::factory()->count(30)->for(function ($post) {
            $post->categories()->saveMany(Category::inRandomOrder()->take(5)->get());
        });
    }
}
