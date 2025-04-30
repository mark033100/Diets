<?php

namespace App\Http\Controllers\Queries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Queries\PatientsService;

class PatientsController extends Controller
{
    protected $patientsService;

    public function __construct(PatientsService $patientsService)
    {
        $this->patientsService = $patientsService;
    }

    public function getAllAdmittedPatients(Request $request)
    {
        return response()->json($this->patientsService->getAllAdmittedPatients());
    }

    public function getAdmittedPatientsDiet($enccode = 'all')
    {
        return response()->json($this->patientsService->getAdmittedPatientsDiet($enccode));
    }

    public function getPatientDietList()
    {

        return response()->json($this->patientsService->getPatientDietList());
    }

    public function getPatientDietHistory($hpercode)
    {
        return response()->json($this->patientsService->getPatientDietHistory($hpercode));
    }

    public function getPatientNutritionScreeningData($enccode)
    {
        return response()->json($this->patientsService->getPatientNutritionScreeningData($enccode));
    }

}
