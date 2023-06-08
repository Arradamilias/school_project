<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'eleveid', 'matiereid', 'note'
    ];

    public function eleves()
    {
        return $this->belongsTo(Eleves::class);
    }

    public function matieres()
    {
        return $this->belongsTo(Matieres::class);
    }
}
