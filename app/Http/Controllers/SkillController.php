<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillController extends Controller
{

    public function index(){
        $posts = Skill::all();
        foreach ($posts as $post) {
            $post->image = asset('storage/' . $post->image);
        }
        return response()->json([
            'status' => 200,
            'posts' => $posts
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'image' => '',
            'title' => 'required',
            'progress' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('image')->store('skill_images', 'public');


        $post = Skill::create([
            'title' => $input['title'],
            'progress' => $input['progress'],
            'image' => $imagePath

        ]);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }


    public function show($id){
        return Skill::find($id);
    }


    public function edit(Skill $skill)
    {
        //
    }


    public function update(Request $request, $id){
        if(Skill::where('id', $id)->exists()) {
            $post = Skill::find($id);
            $post -> image = $request -> image;
            $post -> title = $request -> title;
            $post -> progress = $request -> progress;
            $post -> save();
            return response()->json([
                'message' => 'Post updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Post not found'
            ], 404);
        }}

    public function destroy($id){
        if (Skill::where('id', $id)->exists()) {
            $post = Skill::find($id);
            $post->delete();
            return response()->json([
                'message' => 'Post deleted successfully'
            ], 200);
        }    else{
            return response()->json([
                'message' => 'Post not found'
            ],404);    }
    }
}
