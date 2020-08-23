<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name'        => $faker->text(22),
        'slug'        => $faker->slug(5),
        'description' => $faker->text(),
    ];
});
