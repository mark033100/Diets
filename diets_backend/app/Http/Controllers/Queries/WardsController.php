<?php

namespace App\Http\Controllers\Queries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Queries\WardsService;

class WardsController extends Controller
{
    protected $wardsService;

    public function __construct(WardsService $wardsService)
    {
        $this->wardsService = $wardsService;
    }

    public function getAllWards(Request $request)
    {
        return response()->json($this->wardsService->getAllWards());
    }


}
