<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;

class LetterController extends Controller
{

    public function index()
    {
        $letters = Letter::with('receiver', 'sender', 'candies')->get();
        return response()->json($letters);
    }
}
