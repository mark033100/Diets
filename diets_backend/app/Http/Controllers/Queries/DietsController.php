<?php

namespace App\Http\Controllers\Queries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Queries\DietsService;

class DietsController extends Controller
{
    protected $dietsService;

    public function __construct(DietsService $dietsService)
    {
        $this->dietsService = $dietsService;
    }

    public function getAllDiets(Request $request)
    {
        return response()->json($this->dietsService->getAllDiets());
    }

    public function updateDiets(Request $request)
    {
        return response()->json($this->dietsService->updateDiets());
    }

}
