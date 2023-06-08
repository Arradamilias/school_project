<?php

namespace Database\Factories;

use App\Models\Classrm;
use App\Models\Eleve;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class EleveFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Eleve::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'naissance' => $this->faker->date(),
            'adresse' => $this->faker->address,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'), // Example password hashing, adjust as needed
            'telephone' => $this->faker->phoneNumber,
            'classeid' => function () {
                return Classrm::factory()->create()->id;
            },
        ];
    }
}
