<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotesTable extends Migration
{
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('eleveid');
            $table->unsignedBigInteger('matiereid');
            $table->float('note');
            $table->timestamps();
            $table->foreign('eleveid')->references('id')->on('eleves');
            $table->foreign('matiereid')->references('id')->on('matieres');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notes');
    }
}

