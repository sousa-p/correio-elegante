<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;

class LetterController extends Controller
{

    public function index()
    {
        $letters = Letter::with('receiver', 'sender', 'additionals')->get();
        return response()->json($letters);
    }
}
