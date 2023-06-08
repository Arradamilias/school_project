<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enseignant;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EnseignantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Enseignant::select('id', 'nom', 'prenom', 'naissance', 'adresse', 'email', 'telephone' , 'password')->get();
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
            'telephone'=>'required',
            'password'=>'required',
            
        ]);

        Enseignant::create($request->post());
        return response()->json([
            'message'=>'Enseignant added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return  Enseignant::find($id);
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
    public function update(Request $request,$id)
    {
        $fields = $request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'naissance'=>'required',
            'adresse'=>'required',
            'email'=>'required',
            'telephone'=>'required',
            'password'=>'required',
            
        ]);

        $enseignant = Enseignant::find($id);

        $enseignant->update($fields);
        
        return response()->json([
            'message'=>'Enseignant updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enseignant $enseignant)
    {
        $enseignant->delete();
        return response()->json([
            'message'=>'Eleve deleted successfully'
        ]);
    }
}
