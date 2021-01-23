'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const GetData = use("App/Helpers/GetData");
const Response = use("App/Helpers/Response");

Route.group(() => {
    const UserController = ["changePassword", "logout"];

    // Route.post("captcha", `CaptchaController.${"captcha"}`);
    // // Route.post("login", `UserController.${"login"}`).middleware('captcha');

    Route.post("login", `UserController.${"login"}`);

    Route.post('upload', 'FileController.store').middleware('auth')
    Route.post('/home/save', 'HomeController.store').middleware('auth')
    Route.post('/home/get', 'HomeController.show').middleware('auth')

    Route.post('/live/save', 'LiveController.store').middleware('auth')
    Route.post('/live/get', 'LiveController.show').middleware('auth')

    Route.post('/getData', ({ response }) => {
        GetData()
        return Response(response, {})
    }).middleware('auth')


    for (const route of UserController) {
        Route.post(route, `UserController.${route}`).middleware('auth');
    }
}).prefix("api");

Route.get('/', 'HomeController.index')
Route.get('/live/:type/:id', 'LiveController.index').as('live')

Route.get('/images/:id', 'FileController.show')