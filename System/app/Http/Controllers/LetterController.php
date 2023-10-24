<?php

namespace App\Http\Controllers;

use App\Models\Additional;
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
            'message' => ['required', 'string', 'max:255', 'min:1'],
            'sender_name' => ['required', 'string', 'max:255'],
            'sender_course' => ['nullable', 'string', 'max:255'],
            'sender_year' => ['nullable', 'string', Rule::in(['1', '2', '3'])],
            'anonymous' => ['required', 'boolean'],
            'sender_tel' => ['required', 'string', 'size:15'],
            'receiver_name' => ['required', 'string', 'max:255'],
            'receiver_course' => ['nullable', 'string', 'max:255'],
            'receiver_year' => ['nullable', 'string', Rule::in(['1', '2', '3'])],
            'receiver_characteristics' => ['required', 'string', 'max:200', 'min:1'],
            'additionals' => ['required', 'array'],
            'additionals.*' => ['exists:Additionals,id']
        ]);

        $sender = Sender::create([
            'name' => ucwords($request->input('sender_name')),
            'course' => strToUpper($request->input('sender_course')),
            'year' => $request->input('sender_year'),
            'tel' => $request->input('sender_tel'),
        ]);

        $receiver = Receiver::create([
            'name' => ucwords($request->input('receiver_name')),
            'course' => strToUpper($request->input('receiver_course')),
            'year' => $request->input('receiver_year'),
            'characteristics' => $request->input('receiver_characteristics'),
        ]);

        $letter = Letter::create([
            'message' => ucfirst($request->input('message')),
            'anonymous' => $request->input('anonymous'),
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id
        ]);

        $additionals = Additional::whereIn('id', $request->input('additionals'))->get();

        $letter->Additionals()->attach($additionals);

        return response()->json($letter, 201);
    }

    public function storeCouple(Request $request)
    {
        $this->validate($request, [
            'messages' => ['required', 'array', 'size:2'],
            'messages.*' => ['required', 'string', 'max:255', 'min:1'],
            'anonymous' => ['required', 'boolean'],
            'sender_name' => ['required', 'string', 'max:255'],
            'sender_course' => ['string', 'max:255'],
            'sender_year' => ['nullable', 'string', Rule::in(['1', '2', '3'])],
            'sender_tel' => ['required', 'string', 'size:15'],
            'receivers_names' => ['required', 'array', 'size:2'],
            'receivers_names.*' => ['required', 'string', 'max:255'],
            'receivers_courses' => ['required', 'array', 'size:2'],
            'receivers_courses.*' => ['nullable', 'string', 'max:255'],
            'receivers_years' => ['required', 'array', 'size:2'],
            'receivers_years.*' => ['nullable', 'string', Rule::in(['1', '2', '3'])],
            'receivers_characteristics' => ['required', 'array', 'size:2'],
            'receivers_characteristics.*' => ['required', 'string', 'max:200', 'min:1'],
            'additional' => ['required', 'exists:Additionals,id']
        ]);

        $sender = Sender::create([
            'name' => ucwords($request->input('sender_name')),
            'course' => strToUpper($request->input('sender_course')),
            'year' => $request->input('sender_year'),
            'tel' => $request->input('sender_tel'),
        ]);

        $letters = [];
        $additional = Additional::where('id', $request->input('additionals'))->first();

        for ($i = 0; $i < 2; $i++) {
            $receiver = Receiver::create([
                'name' => ucwords($request->input('receivers_names')[$i]),
                'course' => strToUpper($request->input('receivers_courses')[$i]),
                'year' => $request->input('receivers_years')[$i],
                'characteristics' => $request->input('receivers_characteristics')[$i],
            ]);

            $letter = Letter::create([
                'message' => ucfirst($request->input('messages')[$i]),
                'anonymous' => $request->input('anonymous'),
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id
            ]);
            $letter->Additionals()->attach($additional);
            $letters[] = $letter;
        }

        return response()->json($letters, 201);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => ['required', 'exists:Letters,id'],
            'status' => ['required', 'string', Rule::in(['Aguardando Pagamento', 'Pendente de Envio', 'Enviado'])]
        ]);

        $letter = Letter::find($request->input('id'));
        $letter->status = $request->input('status');
        $letter->save();

        return response()->json($letter, 200);
    }
}
