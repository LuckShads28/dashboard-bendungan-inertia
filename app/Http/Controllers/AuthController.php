<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function loginPage()
    {
        return inertia('Authentication/LoginPage');
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required|min:8'
        ]);

        if (Auth::attempt($validatedData)) {
            return redirect()->route('dashboard.index');
        }

        return redirect()->back()->withErrors(['errors' => 'Invalid email or password']);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('/');
    }
}
