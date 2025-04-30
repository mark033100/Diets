<?php


namespace App\Http\Controllers\Queries;

use App\Services\Queries\AllergyPrecautionService;


class AllergyPrecautionController
{


    protected $allergyPrecautionService;


    public function __construct(AllergyPrecautionService $allergyPrecautionService)
    {
        $this->allergyPrecautionService = $allergyPrecautionService;
    }



    public function getAllAllergiesPrecaution()
    {
        return response()->json($this->allergyPrecautionService->getAllAllergiesPrecaution());
    }

}