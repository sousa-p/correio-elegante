<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sender extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'course',
        'year',
        'tel',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [];

    public $timestamps = false;

    /**
     * Get the letter that owns the Sender
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function letter(): BelongsTo
    {
        return $this->belongsTo(Letter::class);
    }
}
