<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AdminController extends Controller
{
    public function login(Request $request) {
        $this->validate($request, [
            'login' => ['required', 'string', 'max:255', 'exists:Admins'],
            'password' => ['required', 'string', 'max:255', 'min:8'],
          ]);

        $credentials = $request->only('login', 'password');

        if (!$token = auth()->attempt($credentials))
            return response()->json(['login' => 'Credenciais inválidas'], 401);
        
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer'
        ]);
    }
}
