<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Enseignant extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'naissance', 'adresse', 'email', 'telephone' , 'password'
    ];

    // Define any relationships or additional methods related to the Enseignants table here
}
