<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Additional extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'value',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [];

    /**
     * The letters that belong to the Candy
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function letters(): BelongsToMany
    {
        return $this->belongsToMany(Letter::class);
    }
}
