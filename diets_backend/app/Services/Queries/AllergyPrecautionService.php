<?php

namespace App\Services\Queries;

use App\Repositories\Interfaces\AllergiesPrecautionInterface;

class AllergyPrecautionService
{

    protected $allergiesPrecaution;

    public function __construct(AllergiesPrecautionInterface $allergiesPrecaution)
    {

        $this->allergiesPrecaution = $allergiesPrecaution;
    }

    public function getAllAllergiesPrecaution()
    {
        return $this->allergiesPrecaution->getAllAllergiesPrecaution();
    }

}