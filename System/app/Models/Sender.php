<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    /**
     * Get the letter associated with the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function letter(): HasOne
    {
        return $this->hasOne(Letter::class);
    }
}
