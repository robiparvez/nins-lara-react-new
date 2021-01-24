<?php

namespace App\Http\Controllers\Admin;

use App\Post;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    /**
     * Create an instance of controller.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display all posts with pagination.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::with([
            'author:id,first_name,last_name,email',
            'categories:id,name'
        ])
            ->select([
                'id',
                'title',
                'slug',
                'image',
                'author_id',
                'status',
                'created_at',
                'updated_at'
            ])
            ->orderBy('created_at', 'desc')
            ->where('author_id', Auth::id())
            ->paginate($request->input('per_page', 12));

        return response()->json([
            'posts' => $posts,
        ]);
    }

    /**
     * Store a new post to the database,
     *
     * @param \App\Http\Requests\CreatePostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePostRequest $request)
    {
        $post = $this->createOrUpdatePost($request, new Post());

        if ($post instanceof Post) {
            $response = [
                'post'    => $post,
                'message' => 'A new post has been created.',
            ];

            $status = 201;
        } else {
            $response = [
                'message' => 'We are unable to create the post.',
            ];

            $status = 500;
        }

        return response()->json($response, $status);
    }

    /**
     * Display the specified post.
     *
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $post = Post::with([
            'categories',
            'author:id,first_name,last_name,email'
        ])
            ->where('author_id', Auth::id())
            ->findOrFail($id);

        return response()->json([
            'post' => $post,
        ]);
    }

    /**
     * Update the specified post in the database.
     *
     * @param \App\Http\Requests\UpdatePostRequest $request
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, int $id)
    {
        $post = $this->createOrUpdatePost($request, Post::findOrFail($id));

        $status = 200;

        if ($post instanceof Post) {
            $response = [
                'post'    => $post,
                'message' => 'Selected post has been updated.',
            ];
        } else {
            $response = [
                'message' => 'Unable to update the post.',
            ];

            $status = 500;
        }

        return response()->json($response, $status);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Post $post
     * @return \App\Post|bool
     */
    private function createOrUpdatePost(Request $request, Post $post)
    {
        try {
            DB::beginTransaction();

            $post->title = $request->title;
            $post->slug = Str::slug($request->title);
            $post->content = $request->content;

            if ($request->hasFile('image')) {
                $post->image = store_file($request->file('image'), 'public/posts/covers');
            }

            $post->meta_title = $request->meta_title;
            $post->meta_description = $request->meta_description;
            $post->author_id = Auth::id();
            $post->save();

            $post->categories()->sync($request->categories);

            DB::commit();

            $post->load('categories', 'author');

            return $post;
        } catch (Exception $ex) {
            DB::rollBack();
            report($ex);
            return false;
        }
    }
}
