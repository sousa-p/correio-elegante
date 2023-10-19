<?php

return [
    'defaults' => [
        'guard' => 'admin',
        'password_field' => 'password',
    ],
    'guards' => [
        'admin' => [
            'driver' => 'jwt',
            'provider' => 'admins'
        ]
    ],

    'providers' => [
        'admins' => [
            'driver' => 'eloquent',
            'model' => \App\Models\Admin::class,
        ]
    ]
];
