<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElevesTable extends Migration
{
    public function up()
    {
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 255);
            $table->string('prenom', 255);
            $table->date('naissance');
            $table->string('adresse', 255);
            $table->string('email', 255);
            $table->string('password');
            $table->string('telephone', 255);
            $table->unsignedBigInteger('classeid');
            $table->foreign('classeid')
                  ->references('id')
                  ->on('classrms')
                  ->onDelete('cascade'); // Add ON DELETE CASCADE

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('eleves');
    }
}
