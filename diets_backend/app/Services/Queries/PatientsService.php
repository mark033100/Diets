<?php

namespace App\Services\Queries;

use App\Repositories\Interfaces\PatientsInterface;

class PatientsService
{

    protected $patientsRepository;


    public function __construct(PatientsInterface $patients_Interface)
    {

        $this->patientsRepository = $patients_Interface;
    }

    public function getAllAdmittedPatients()
    {

        return collect($this->patientsRepository->getAllAdmittedPatients());

    }

    public function getAdmittedPatientsDiet($enccode = 'all')
    {
        $dietData = collect($this->patientsRepository->getAdmittedPatientsDiet($enccode))
            ->map(fn($item) => (array) $item); // Convert stdClass to array

        $screeningRisk = collect($this->patientsRepository->getPatientNutritionRisk($enccode))
            ->first()
            ->riskIndicator ?? 'No Screening Risk Result';

        return $dietData->map(fn($item) => array_merge($item, ['riskIndicator' => $screeningRisk]));
    }



    public function getPatientDietList()
    {

        return collect($this->patientsRepository->getPatientDietList());

    }

    public function getPatientDietHistory($hpercode)
    {

        return collect($this->patientsRepository->getPatientDietHistory($hpercode));

    }

    public function getPatientNutritionScreeningData($enccode)
    {

        return collect($this->patientsRepository->getPatientNutritionScreeningData($enccode));

    }




}