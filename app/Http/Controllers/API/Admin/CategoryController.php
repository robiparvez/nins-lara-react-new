<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display all categories or with pagination links.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categoriesQuery = Category::orderBy('created_at', 'desc');

        $categories = $request->has('all')
            ? $categoriesQuery->get()
            : $categoriesQuery->paginate($request->input('per_page', 12));

        return response()->json([
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new category to the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateNewOrExistingCategory($request);

        $category = $this->createOrUpdateCategory(
            $request,
            new Category()
        );

        return response()->json([
            'category' => $category,
            'message'  => 'A new category has been created.',
        ], 201);
    }

    /**
     * Display the specified category.
     *
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $category = Category::findOrFail($id);

        return response()->json([
            'category' => $category,
        ]);
    }

    /**
     * Update the specified category in the database.
     *
     * @param Request $request
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $this->validateNewOrExistingCategory($request, $id);

        $category = Category::findOrFail($id);

        $this->createOrUpdateCategory(
            $request,
            $category
        );

        return response()->json([
            'category' => $category,
            'message'  => 'Selected category has been updated.',
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param integer $id
     * @return void
     */
    private function validateNewOrExistingCategory(Request $request, int $id = null)
    {
        $rules = [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:190',
                'unique:categories,name' . ($id ? ",{$id}" : ''),
            ],
            'description' => 'nullable|string|min:5|max:1000',
        ];

        $messages = [
            'unique' => 'The group :attribute already exists.',
        ];

        $request->validate($rules, $messages);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Category $category
     * @return \App\Category
     */
    private function createOrUpdateCategory(Request $request, Category $category)
    {
        $category->name        = $request->name;
        $category->slug        = Str::slug($request->name);
        $category->description = $request->description;
        $category->status      = $request->filled('status');
        $category->save();

        return $category;
    }
}
