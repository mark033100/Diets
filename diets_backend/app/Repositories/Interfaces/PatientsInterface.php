<?php


namespace App\Repositories\Interfaces;

interface PatientsInterface
{
    public function getAllAdmittedPatients();
    public function getAdmittedPatientsDiet($enccode);

    public function getPatientDietList();

    public function getPatientDietHistory($hpercode);

    public function getPatientNutritionRisk($enccode);

    public function getPatientNutritionScreeningData($enccode);
}