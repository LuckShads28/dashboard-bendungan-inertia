<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loginPage()
    {
        return inertia('Authentication/LoginPage');
    }

    public function login(Request $request)
    {
        dd($request);
    }
}
