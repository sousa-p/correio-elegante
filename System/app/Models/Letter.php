<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Letter extends Model
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
     * Get the sender associated with the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function sender(): HasOne
    {
        return $this->hasOne(Sender::class, 'id');
    }

    /**
     * Get the receiver associated with the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function receiver(): HasOne
    {
        return $this->hasOne(Receiver::class, 'id');
    }

    /**
     * Get all of the candies for the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function candies(): BelongsToMany
    {
        return $this->belongsToMany(Candy::class);
    }
}
