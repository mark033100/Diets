<?php

/* MSSQL Functions
    1. fn_admittedPatients()
        • get all admitted patients
    2. fn_patientDietEnccode('all')
        • get all/specific admitted patient/s with their diets
        • parameters: 'all' | enccode
*/


namespace App\Repositories\Queries;

use App\Repositories\Interfaces\PatientsInterface;

class PatientsRepository implements PatientsInterface
{
    public function getAllAdmittedPatients()
    {
        return \DB::select('SELECT * FROM fn_admittedPatients()');
    }

    public function getAdmittedPatientsDiet($enccode)
    {
        return \DB::select("SELECT * FROM fn_patientDietEnccode(?)", [$enccode]);
    }


    public function getPatientDietList()
    {
        // USED ONLY FOR PATIENT SEARCH PAGE
        return \DB::select("SELECT enccode, hpercode, patname, wardname, dietname, admdate, category, precaution FROM fn_patientDietEnccode(?)", ['all']);
    }

    public function getPatientDietHistory($hpercode)
    {
        return \DB::table('hdocord as do')
            ->select('do.*', 'diet.dietname', 'diet.dietgroup', 'nutrients.*', 'allergy.category', 'diet_ons.*', 'employee.lastname as lname', 'employee.firstname as fname', 'diet1.dietname as onsName', 'diet2.dietname as onsName2', 'emp.lastname as ln', 'emp.firstname as fn')
            ->join('diet', 'do.dietcode', '=', 'diet.dietcode')
            ->leftJoin('nutrients', 'do.docointkey', '=', 'nutrients.docointkey')
            ->leftJoin('patientFoodAllergies as allergy', 'do.hpercode', '=', 'allergy.hpercode')
            ->leftJoin('diet_ons', 'do.docointkey', '=', 'diet_ons.docointkey')
            ->leftjoin('diet as diet1', 'diet_ons.onsFormula', '=', 'diet1.dietcode')
            ->leftJoin('diet as diet2', 'diet_ons.onsFormula2', '=', 'diet2.dietcode')
            ->leftJoin('hospital.dbo.hpersonal as emp', 'do.licno', '=', 'emp.employeeid')
            ->leftJoin('hospital.dbo.hpersonal as employee', function ($join) {
                $join->on('employee.employeeid', '=', 'pr.employeeid')
                    ->leftJoin('hospital.dbo.hprovider as pr', 'pr.employeeid', '=', 'employee.employeeid')
                    ->whereRaw('pr.licno = do.licno');
            })
            ->where('do.hpercode', $hpercode)
            ->orderByRaw("CASE
                                WHEN do.dostatus = 'A' THEN 1
                                WHEN do.dostatus = 'P' THEN 2
                                WHEN do.dostatus = 'I' THEN 3
                            END")
            ->orderByDesc('do.dodate')
            ->get();

    }

    public function getPatientNutritionRisk($enccode)
    {
        return \DB::table('patientNutrition as na')
            ->select('riskIndicator')
            ->where('enccode', '=', $enccode)
            ->get();
    }

    public function getPatientNutritionScreeningData($enccode)
    {
        return \DB::table('patientNutrition')
            ->where('enccode', '=', $enccode)
            ->get();
    }


    public function getPatientSNS($docointkey)
    {
        return \DB::table('diet_ons')
            ->where('enccode', '=', $docointkey)
            ->get();
    }


}