<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos, 200);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());
        return response()->json($todo, 201);
    }

    public function show($id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo, 200);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return response()->json($todo, 200);
    }

    public function destroy($id)
    {
        Todo::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
