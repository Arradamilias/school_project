<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Eleve;
use Database\Factories\EleveFactory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Classrm::factory(10)->create();

        $eleveFactory = EleveFactory::new();

        for ($i = 0; $i < 20; $i++) {
            $eleve = $eleveFactory->make();
            $eleve->classeid = \App\Models\Classrm::inRandomOrder()->first()->id;
            $eleve->save();
        }
        
        \App\Models\Enseignant::factory(5)->create();
    }
}
