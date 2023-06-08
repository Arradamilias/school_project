<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;



class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Note::select('id', 'eleveid', 'matiereid', 'note')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'eleveid'=>'required',
            'matiereid'=>'required',
            'note'=>'required',
        ]);
        Note::create($request->post());
        return response()->json([
            'message'=>'Note added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        return response()->json([
            'note'=>$note
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $request->validate([
            'eleveid'=>'required',
            'matiereid'=>'required',
            'note'=>'required',
        ]);

        $note->fill($request->post())->update();

        $note->save();
        return response()->json([
            'message'=>'Note updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();
        return response()->json([
            'message'=>'Note deleted successfully'
        ]);
    }
}
