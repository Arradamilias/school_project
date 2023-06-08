<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    protected $fillable = [
        'nom', 'enseignantid'
    ];


    public function enseignants()
    {
        return $this->belongsTo(Enseignants::class);
    }
}
