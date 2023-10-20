<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use App\Models\Receiver;
use App\Models\Sender;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LetterController extends Controller
{

    public function index()
    {
        $letters = Letter::with('receiver', 'sender', 'additionals')->get();
        return response()->json($letters);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'message' => ['required', 'string', 'max:255'],
            'sender_name' => ['string', 'max:255'],
            'sender_course' => ['string', 'max:255'],
            'sender_year' => ['string', Rule::in(['1', '2', '3'])],
            'sender_tel' => ['required', 'string', 'max:11'],
            'receiver_name' => ['required', 'string','max:255'],
            'receiver_course' => ['required', 'string', 'max:255'],
            'receiver_year' => ['required', 'string', Rule::in(['1', '2', '3'])],
            'receiver_characteristics' => ['required', 'string', 'max:200']
        ]);

        $sender = Sender::create([
            'name'=> ucwords($request->input('sender_name')),
            'course'=> strToUpper($request->input('sender_course')),
            'year' => $request->input('sender_year'),
            'tel' => $request->input('sender_tel'),
        ]);

        $receiver = Receiver::create([
            'name'=> ucwords($request->input('receiver_name')),
            'course'=> strToUpper($request->input('receiver_course')),
            'year' => $request->input('receiver_year'),
            'characteristics' => $request->input('receiver_characteristics'),
        ]);

        $letter = Letter::create([
            'message' => ucfirst($request->input('message')),
            'sent' => false,
            'sender_id'=> $sender->id,
            'receiver_id' => $receiver->id
        ]);

        return response()->json($letter, 201);
    }
}
