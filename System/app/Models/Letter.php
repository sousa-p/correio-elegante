<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Letter extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name_sender',
        'course_sender',
        'year_sender',
        'name_receiver',
        'course_receiver',
        'year_receiver',
        'characteristics_receiver',
        'type',
        'message',
        'sent',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [
    ];
}
