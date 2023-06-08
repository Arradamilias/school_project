<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classrm;


class Eleve extends Model
{
    protected $table = 'eleves';
    protected $fillable = [
        'nom',
        'prenom',
        'naissance',
        'adresse',
        'email',
        'password',
        'telephone',
        'classeid',
    ];

    // Define the relationship with Classe model
    public function classrms()
    {
        return $this->belongsTo(Classrms::class);
    }
}
