<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Eleve;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Eleve::select('id', 'nom','prenom','naissance','adresse','email' ,'password','telephone','classeid')->get();
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
            'nom'=>'required',
            'prenom'=>'required',
            'naissance'=>'required',
            'adresse'=>'required',
            'email'=>'required',
            'password' =>'required',
            'telephone'=>'required',
            'classeid'=>'required',
        ]);

        Eleve::create($request->post());
        return response()->json([
            'message'=>'Eleve added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Eleve::find($id);
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
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'naissance'=>'required',
            'adresse'=>'required',
            'email'=>'required',
            'password'=>'required',
            'telephone'=>'required',
            'classeid'=>'required',
        ]);

        $eleve  = Eleve::find($id);

        $eleve->update($fields);

        return response()->json([
            'message'=>'Eleve updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Eleve $eleve)
    {
        $eleve->delete();
        return response()->json([
            'message'=>'Eleve deleted successfully'
        ]);
    }
}
