<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\SkillController;
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
Route::get('/skill/posts', [SkillController::class, 'index']);
Route::get('/skill/post/{id}', [SkillController::class, 'show']);
Route::post('/skill/post', [SkillController::class, 'store']);
Route::put('/skill/post/{id}', [SkillController::class, 'update']);
Route::delete('/skill/post/{id}', [SkillController::class, 'destroy']);

Route::get('/about/posts', [AboutController::class, 'index']);
Route::get('/about/post/{id}', [AboutController::class, 'show']);
Route::post('/about/post', [AboutController::class, 'store']);
Route::put('/about/post/{id}', [AboutController::class, 'update']);
Route::delete('/about/post/{id}', [AboutController::class, 'destroy']);


Route::get('/banner/posts', [ProjectController::class, 'index']);
Route::get('/banner/post/{id}', [ProjectController::class, 'show']);
Route::post('/banner/post', [ProjectController::class, 'store']);
Route::put('/banner/post/{id}', [ProjectController::class, 'update']);
Route::delete('/banner/post/{id}', [ProjectController::class, 'destroy']);

Route::get('/posts', [HomePageController::class, 'index']);
Route::get('/post/{id}', [HomePageController::class, 'show']);
Route::post('/post', [HomePageController::class, 'store']);
Route::put('/post/{id}', [HomePageController::class, 'update']);
Route::delete('/post/{id}', [HomePageController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
