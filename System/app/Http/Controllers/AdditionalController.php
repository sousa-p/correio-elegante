<?php

namespace App\Http\Controllers;

use App\Models\Additional;
use Illuminate\Http\Request;

class AdditionalController extends Controller
{
    public function index() {
        $additionals = Additional::all();
        return response()->json($additionals);
    }
}
