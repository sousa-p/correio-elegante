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
        'message',
        'anonymous',
        'sender_id',
        'receiver_id'
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
        return $this->hasOne(Sender::class, 'id', 'sender_id');
    }

    /**
     * Get the receiver associated with the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function receiver(): HasOne
    {
        return $this->hasOne(Receiver::class, 'id', 'receiver_id');
    }

    /**
     * Get all of the additionals for the Letter
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function additionals(): BelongsToMany
    {
        return $this->belongsToMany(Additional::class);
    }
}
