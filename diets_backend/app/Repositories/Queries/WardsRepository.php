<?php

namespace App\Repositories\Queries;

use App\Repositories\Interfaces\WardsInterface;

class WardsRepository implements WardsInterface
{
    public function getAllWards()
    {
        return \DB::table('hospital.dbo.hward')
            ->select('wardcode', 'wardname')
            ->where('wardstat', '=', 'A')
            ->get();
    }
}