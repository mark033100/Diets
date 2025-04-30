<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Queries\{DietsController, PatientsController, WardsController, AllergyPrecautionController};

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('v1')->controller(DietsController::class)->group(function () {

    Route::get('/diets', 'getAllDiets');
    Route::get('/diets-update', 'updateDiets');

});


Route::prefix('v1')->controller(PatientsController::class)->group(function () {

    Route::get('/patients', 'getAllAdmittedPatients');
    Route::get('/patients-diet/{enccode?}', 'getAdmittedPatientsDiet');
    Route::get('/patients-diet-search', 'getPatientDietList');
    Route::get('/patients-diet-history/{hpercode}', 'getPatientDietHistory');
    Route::get('/patients-nutrition-screening/{enccode}', 'getPatientNutritionScreeningData');
});

Route::prefix('v1')->controller(WardsController::class)->group(function () {

    Route::get('/wards', 'getAllWards');

});


Route::prefix('v1')->controller(AllergyPrecautionController::class)->group(function () {

    Route::get('/allergies-precaution', 'getAllAllergiesPrecaution');

});

// ADM1002271Jan022025031248