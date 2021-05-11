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
    return view('welcome');
});


Route::group(['prefix' => 'stream'],
        function() {
            Route::get('client/{slug}', [
                'uses' => 'App\Http\Controllers\StreamController@client'])
                ->name('stream.client');

            Route::get('analist', [
                'uses' => 'App\Http\Controllers\StreamController@analist'])
                ->name('stream.analist');
        });

