<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{

    public function index(){
        $posts = About::all();
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
            'image' => 'required',
            'description_1' => 'required',
            'description_2' => 'required',
            'description_3' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('image')->store('about_images', 'public');


        $post = About::create([
            'description_1' => $input['description_1'],
            'description_2' => $input['description_2'],
            'description_3' => $input['description_3'],
            'image' => $imagePath,

        ]);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }


    public function show($id){
        return About::find($id);
    }


    public function edit(About $about)
    {
        //
    }


    public function update(Request $request, $id){
        if(About::where('id', $id)->exists()) {
            $post = About::find($id);
            $post -> description_1 = $request -> description_1;
            $post -> description_2 = $request -> description_2;
            $post -> image = $request -> image;
            $post -> description_3 = $request -> description_3;
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
        if (About::where('id', $id)->exists()) {
            $post = About::find($id);
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
