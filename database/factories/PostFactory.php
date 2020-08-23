<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'name'             => $faker->text(120),
        'slug'             => $faker->slug(12),
        'content'          => $faker->text(5000),
        'image'            => 'image.png',
        'meta_title'       => $faker->text(120),
        'meta_description' => $faker->text(250),
        'author_id'        => User::first()->id,
    ];
});
