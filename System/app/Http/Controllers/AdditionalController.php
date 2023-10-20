<?php

namespace App\Http\Controllers;

use App\Models\Candy;
use Illuminate\Http\Request;

class CandyController extends Controller
{
    public function index() {
        $candies = Candy::all();
        return response()->json($candies);
    }

    public function store(Request $request) {
        
    }
}
