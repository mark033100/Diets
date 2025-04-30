<?php

namespace App\Repositories\Queries;

use App\Repositories\Interfaces\DietsInterface;

class DietsRepository implements DietsInterface
{
    public function getAllDiets()
    {
        return \DB::table('diet')
            ->select('dietcode', 'dietname', 'dietstat', 'diettype', 'dietgroup', 'dietdesc', 'created_at', 'updated_at')
            ->get();
    }
}