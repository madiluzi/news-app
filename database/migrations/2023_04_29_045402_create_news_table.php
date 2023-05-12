<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle');
            $table->text('content');
            // $table->integer('category_id')->unsigned();
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
            // $table->foreignId('category_id')->constrained('categories');
            // $table->integer('tag_id')->unsigned();
            $table->foreignId('tag_id')->references('id')->on('tags')->onDelete('cascade');
            // $table->foreignId('tag_id')->constrained('tags');
            // $table->integer('media_id')->unsigned();
            $table->foreignId('media_id')->references('id')->on('media')->onDelete('cascade');
            // $table->foreignId('media_id')->constrained('media');
            // $table->integer('author_id')->unsigned();
            $table->foreignId('author_id')->references('id')->on('users')->onDelete('cascade');
            // $table->foreignId('author_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
};
