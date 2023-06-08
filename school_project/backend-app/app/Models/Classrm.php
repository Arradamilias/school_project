<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classrm extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'niveau',
    ];

}
