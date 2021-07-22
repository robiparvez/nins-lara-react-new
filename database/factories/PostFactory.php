<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'             => $this->faker->text(120),
            'slug'             => $this->faker->slug(12),
            'content'          => $this->faker->text(5000),
            'image'            => 'image.png',
            'meta_title'       => $this->faker->text(120),
            'meta_description' => $this->faker->text(250),
            'author_id'        => User::first()->id,
        ];
    }
}
