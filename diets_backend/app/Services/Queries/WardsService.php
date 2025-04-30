<?php

namespace App\Services\Queries;

use App\Repositories\Interfaces\WardsInterface;

class WardsService
{

    protected $wardsRepository;


    public function __construct(WardsInterface $wards_Interface)
    {

        $this->wardsRepository = $wards_Interface;
    }

    public function getAllWards()
    {

        return \Cache::remember('wards', now()->addDays(1), function () {

            return collect($this->wardsRepository->getAllWards());

        });

    }


    public function updateDiets()
    {

        \Cache::forget('diets');

    }

}