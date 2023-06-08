<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classrm;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;



class ClassrmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Classrm::select('id', 'nom','niveau')->get();
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
            'niveau'=>'required'
        ]);
        Classrm::create($request->post());
        return response()->json([
            'message'=>'Classe added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classrm $classrm)
    {
        return response()->json([
            'classrm'=>$classrm
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
    public function update(Request $request, Classrm $classrm)
    {
        $request->validate([
            'nom'=>'required',
            'niveau'=>'required'
        ]);

        $classrm->fill($request->post())->update();

        $classrm->save();
        return response()->json([
            'message'=>'Classe updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classrm $classrm)
    {
        $classrm->delete();
        return response()->json([
            'message'=>'Classe deleted successfully'
        ]);
    }
}
