<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Receiver extends Model
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
        'characteristics',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [];

    /**
     * Get the sender associated with the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function letter(): HasOne
    {
        return $this->hasOne(Letter::class);
    }
}
