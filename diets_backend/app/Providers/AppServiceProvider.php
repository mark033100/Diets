<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Queries\{DietsRepository, PatientsRepository, WardsRepository, AllergiesPrecautionRepository};
use App\Repositories\Interfaces\{DietsInterface, PatientsInterface, WardsInterface, AllergiesPrecautionInterface};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DietsInterface::class, DietsRepository::class);
        $this->app->bind(PatientsInterface::class, PatientsRepository::class);
        $this->app->bind(WardsInterface::class, WardsRepository::class);
        $this->app->bind(AllergiesPrecautionInterface::class, AllergiesPrecautionRepository::class);


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
