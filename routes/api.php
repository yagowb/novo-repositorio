<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('todos', 'App\Http\Controllers\TodoController@index');

Route::post('todos', 'App\Http\Controllers\TodoController@store');

Route::get('todos/{id}', 'App\Http\Controllers\TodoController@show');

Route::put('todos/{id}', 'App\Http\Controllers\TodoController@update');

Route::delete('todos/{id}', 'App\Http\Controllers\TodoController@destroy');



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
