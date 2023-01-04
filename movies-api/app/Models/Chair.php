<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chair extends Model
{
    use HasFactory;
    protected $fillable = [
        'price',
        'row',
        'column',
        'movie_id',
        'user_id',
        'reserved_at'
    ];
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
