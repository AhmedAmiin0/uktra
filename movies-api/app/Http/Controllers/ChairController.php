<?php

namespace App\Http\Controllers;

use App\Models\Chair;
use App\Http\Requests\StoreChairRequest;
use App\Http\Requests\UpdateChairRequest;
use App\Http\Resources\ChairResource;
use App\Models\Movie;
use App\Models\User;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Barryvdh\DomPDF\Facade\Pdf;

class ChairController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function index(Movie $movie)
    {
        return ChairResource::collection($movie->chairs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreChairRequest $request
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function store(StoreChairRequest $request, Movie $movie)
    {
        try {
            $chair = new Chair($request->validated());
            $chair->movie_id = $movie->id;
            $chair->save();
            return response()->json(['message' => 'Chair created successfully', 'data' => ChairResource::make($chair)], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Chair $chair
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie, Chair $chair)
    {
        return ChairResource::make($chair);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateChairRequest $request
     * @param \App\Models\Chair $chair
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateChairRequest $request, Chair $chair)
    {
        try {
            $chair->update($request->validated());
            return response()->json(['message' => 'Chair updated successfully', 'data' => ChairResource::make($chair)], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Chair $chair
     * @param \App\Models\Movie $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie, Chair $chair)
    {
        try {
            $chair->delete();
            return response()->json(['message' => 'Chair deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function bookChair(Movie $movie, Chair $chair)
    {
        try {
            $user = User::findOrFail(auth()->user()->id);
            $chair->user_id = $user->id;
            $chair->reserved_at = now();
            $chair->save();
            if ($user->balance < $chair->price) {
                return response()->json(['message' => 'Not enough money'], 422);
            }
            return response()->json(['message' => 'Chair booked successfully', 'data' => ChairResource::collection(Chair::where('movie_id', $movie->id)->get())], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function unBookChair(Movie $movie, Chair $chair)
    {
        try {
            $user = User::findOrFail(auth()->user()->id);

            if ($chair->user_id != $user->id) {
                return response()->json(['message' => 'You can not unbook this chair'], 422);
            }

            $chair->update(['user_id' => null, 'reserved_at' => null]);

            $user->balance += $chair->price;

            return response()->json(['message' => 'Chair unbooked successfully', 'data' => ChairResource::collection(Chair::where('movie_id', $movie->id)->get())], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function exportCsvForChairs(Movie $movie)
    {
        $movie->load(['chairs', 'chairs.user']);
        $time = time();
        $path = storage_path("app/public/export$time.xlsx");
        $writer = SimpleExcelWriter::create($path)
            ->addHeader([
                'Movie Title',
                'Movie Description',
                'Movie Start Date',
                'Movie End Date',
                'Chair Price',
                'Chair Row',
                'Chair Column',
                'User Name',
                'User Email',
                'Chair Reserved At',
            ])
            ->addRows($movie->chairs->map(fn($chair) => [
                $movie->title,
                $movie->description,
                $movie->start_date,
                $movie->end_date,
                $chair->price,
                $chair->row,
                $chair->column,
                $chair->user?->name ?? "not reserved",
                $chair->user?->email ?? "not reserved",
                $chair->reserved_at ?? "not reserved",
            ])->toArray());
        return response()->download($path, "export$time.xlsx");
    }

    public function exportPdfForChairs(Movie $movie)
    {
        try {

            $movie->load(['chairs', 'chairs.user']);
            $time = time();
            $path = storage_path("app/public/export$time.pdf");
            $pdf = Pdf::loadView('pdf', ['movie' => $movie]);
            $pdf->save($path);
            return response()->download($path, "export$time.pdf");
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

    }
}
