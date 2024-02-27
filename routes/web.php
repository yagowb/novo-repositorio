<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/todos', 'TodoController@index');
Route::post('/todos', 'TodoController@store');
Route::get('/todos/{id}', 'TodoController@show');
Route::put('/todos/{id}', 'TodoController@update');
Route::delete('/todos/{id}', 'TodoController@destroy');

require __DIR__.'/auth.php';
