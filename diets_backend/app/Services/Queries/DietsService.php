<?php

namespace App\Services\Queries;

use App\Repositories\Interfaces\DietsInterface;

class DietsService
{

    protected $dietsRepository;


    public function __construct(DietsInterface $diets_Interface)
    {

        $this->dietsRepository = $diets_Interface;
    }

    public function getAllDiets()
    {

        return \Cache::remember('diets', now()->addDays(1), function () {

            return collect($this->dietsRepository->getAllDiets());

        });

    }


    public function updateDiets()
    {

        \Cache::forget('diets');

    }

}