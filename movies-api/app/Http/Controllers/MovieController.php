<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieResource;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Barryvdh\DomPDF\PDF;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MovieResource::collection(
            QueryBuilder::for(Movie::class)
                ->with(['media', 'chairs'])
                ->withCount(['chairs' => fn($query) => $query->whereNull('user_id')])
                ->allowedFilters([
                    AllowedFilter::callback('search', function ($query, $value) {
                        $query->where('title', 'like', "%{$value}%");
                    }),
                    AllowedFilter::callback('isShowOver', function ($query, $value, $property) {
                        if ($value == 'over') {
                            $query->where('start_time', '<', now());
                        } elseif ($value == 'ongoing') {
                            $query->where('show_over', '>', now());
                        }
                    }),
                ])
                ->allowedSorts(['title', 'description', 'created_at', 'updated_at', 'start_date', 'end_date'])
                ->allowedIncludes(['chairs'])
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreMovieRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMovieRequest $request)
    {
        try {
            $movie = Movie::create($request->validated());
            $movie->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnail');
            return response()->json(['message' => 'Movie created successfully', 'data' => MovieResource::make($movie)], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        $movie->load(['media', 'chairs']);
        return MovieResource::make($movie);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateMovieRequest $request
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMovieRequest $request, $movieId)
    {
        try {
            $movie = Movie::findOrFail($movieId);
            $movie->update(request()->all());
            if ($request->hasFile('thumbnail'))
                $movie->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnail');


            return response()->json(['message' => 'Movie updated successfully', 'data' => MovieResource::make($movie)], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        try {
            $movie->delete();
            return response()->json(['message' => 'Movie deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


}
