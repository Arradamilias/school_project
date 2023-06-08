<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matiere;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;



class MatiereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Matiere::select('id', 'nom', 'enseignantid')->get();
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
            'enseignantid'=>'required'
        ]);
        Matiere::create($request->post());
        return response()->json([
            'message'=>'Matiere added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Matiere $matiere)
    {
        return response()->json([
            'matiere'=>$matiere
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
    public function update(Request $request, Matiere $matiere)
    {
        $request->validate([
            'nom'=>'required',
            'enseignantid'=>'required'
        ]);

        $matiere->fill($request->post())->update();

        $matiere->save();
        return response()->json([
            'message'=>'Matiere updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Matiere $matiere)
    {
        $matiere->delete();
        return response()->json([
            'message'=>'Matiere deleted successfully'
        ]);
    }
}
