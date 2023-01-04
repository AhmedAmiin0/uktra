<?php

use Illuminate\Http\Request;
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
Route::middleware([
    'auth:sanctum',
    'OnlyAdmins'
])->group(function () {
    Route::apiResource('movies', \App\Http\Controllers\MovieController::class)->except(['index', 'show']);
    Route::apiResource('movies.chairs', \App\Http\Controllers\ChairController::class)->except(['index', 'show']);
    Route::apiResource('users', \App\Http\Controllers\UserController::class);
});

Route::prefix('movies')->group(function () {

    Route::get('/', [\App\Http\Controllers\MovieController::class, 'index']);

    Route::prefix('{movie}')->controller(\App\Http\Controllers\ChairController::class)
        ->group(function () {
            Route::get('/', [\App\Http\Controllers\MovieController::class, 'show']);
            Route::get('/chairs', [\App\Http\Controllers\ChairController::class, 'index']);
            Route::get('/chairs/{chair}', [\App\Http\Controllers\ChairController::class, 'show']);

            Route::get('excel', 'exportCsvForChairs');
            Route::get('pdf', 'exportPdfForChairs');
            Route::middleware('auth:sanctum')->group(function () {
                Route::get('/chairs/{chair}/book', 'bookChair')->middleware('auth:sanctum');
                Route::get('/chairs/{chair}/cancel', 'unBookChair')->middleware('auth:sanctum');
            });
        });

});

Route::controller(\App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
    Route::get('profile', 'profile')->middleware('auth:sanctum');
});

