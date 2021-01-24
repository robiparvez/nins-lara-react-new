<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Admin')->prefix('/admin')->group(function () {
    Route::namespace('Auth')->group(function () {
        Route::post('/login', 'LoginController@login');
        Route::post('/logout', 'LoginController@logout');
    });

    Route::apiResource('/groups', 'GroupController')
        ->except(['destroy']);

    Route::get('/groups/{id}/permissions', 'PermissionController@index');
    Route::put('/groups/{id}/permissions', 'PermissionController@assignPermissionsToGroup');

    Route::apiResource('categories', 'CategoryController')
        ->except(['destroy']);

    Route::apiResource('posts', 'PostController')
        ->except(['destroy']);
});
