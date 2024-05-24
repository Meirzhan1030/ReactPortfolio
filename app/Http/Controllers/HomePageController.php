<?php

namespace App\Http\Controllers;

use App\Models\HomePage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomePageController extends Controller
{

    public function index(){
        $posts = HomePage::all();
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
            'name' => 'required',
            'description' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('image')->store('post_images', 'public');


        $post = HomePage::create([
            'name' => $input['name'],
            'description' => $input['description'],
            'image' => $imagePath
//                $imagePath
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }


    public function show($id)
    {
        return HomePage::find($id);
    }


    public function edit(HomePage $homePage)
    {
        //
    }


    public function update(Request $request, $id){
        if(HomePage::where('id', $id)->exists()) {
            $post = HomePage::find($id);
            $post -> name = $request -> name;
            $post -> description = $request -> description;
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
        if (HomePage::where('id', $id)->exists()) {
            $post = HomePage::find($id);
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
