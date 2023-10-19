<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

$router->group(['login'=> '/admin'], function () use ($router) {
    $router->get('/login','AdminController@login');
});


/*
|--------------------------------------------------------------------------
| Letter Routes
|--------------------------------------------------------------------------
*/

$router->group(['prefix'=> '/letter'], function () use ($router) {
    $router->get('/','LetterController@index');
    $router->post('/store','LetterController@store');
});


/*
|--------------------------------------------------------------------------
| Candy Routes
|--------------------------------------------------------------------------
*/

$router->group(['prefix'=> '/candy'], function () use ($router) {
    $router->get('/','CandyController@index');
});
