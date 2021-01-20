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

const data = require('../data.json')
const Home = use('App/Models/Home')

Route.group(() => {
    // const AdminController = ["create", "edit", "delete", "list"];

    // Route.post("captcha", `CaptchaController.${"captcha"}`);
    // // Route.post("login", `UserController.${"login"}`).middleware('captcha');
    // // Route.post("logout", `UserController.${"logout"}`).middleware('auth');

    Route.post("login", `UserController.${"login"}`);
    Route.post("logout", `UserController.${"logout"}`).middleware('auth');

    Route.post('upload', 'FileController.store')
    Route.post('/home/save', 'HomeController.store')
    Route.post('/home/get', 'HomeController.show')

    Route.post('/live/save', 'LiveController.store')
    Route.post('/live/get', 'LiveController.show')
        // for (const route of AdminController) {
        //     Route.post(route, `backstage/auth/AdminController.${route}`).middleware('auth');
        // }
}).prefix("api");

Route.get('/', 'HomeController.index')
Route.get('/live/:type/:id', 'HomeController.index')

Route.get('', async({ params, view }) => {
    // today tomorrow afterTomorrow nextDay
    const home = await Home.find({ id: 1 })

    const homeDetails = {
        logoSrc: home.logo_src,
        promoteLeftSrc: home.promote_left_src,
        promoteRightSrc: home.promote_right_src,
        bottomProtocol: home.bottom_protocol
    }

    let result = {}
    for (const iterator of data[params.type]) {
        if (iterator.id == params.id) result = await iterator
    }
    return view.render('live', { data: result, homeDetails: homeDetails })
}).as('live')

Route.get('/images/:id', 'FileController.show')