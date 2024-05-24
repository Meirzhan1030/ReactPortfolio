<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index(){
        $posts = Project::all();
        foreach ($posts as $post) {
            $post->image = asset('storage/' . $post->image);
        }
        return response()->json([
            'status' => 200,
            'posts' => $posts
        ]);
    }

    public function show($id){
        return Project::find($id);
    }

    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'image' => '',
            'title' => 'required',
            'description' => 'required',
            'url_name' => 'required',
            'url' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('image')->store('project_images', 'public');


        $post = Project::create([
            'title' => $input['title'],
            'description' => $input['description'],
            'url_name' => $input['url_name'],
            'url' => $input['url'],
            'image' => $imagePath,

        ]);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }

    public function update(Request $request, $id){
        if(Project::where('id', $id)->exists()) {
            $post = Project::find($id);
            $post -> image = $request -> image;
            $post -> description = $request -> description;
            $post -> url = $request -> url;
            $post -> url_name = $request -> url_name;
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
        if (Project::where('id', $id)->exists()) {
            $post = Project::find($id);
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
