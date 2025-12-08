<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all routes except API
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');

