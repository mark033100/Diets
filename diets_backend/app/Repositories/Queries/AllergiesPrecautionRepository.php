<?php

namespace App\Repositories\Queries;
use App\Repositories\Interfaces\AllergiesPrecautionInterface;


class AllergiesPrecautionRepository implements AllergiesPrecautionInterface
{

    public function getAllAllergiesPrecaution()
    {
        return \DB::table('allergyprecaution')
            ->select('id', 'name', 'category', 'description')
            ->get();

    }
}