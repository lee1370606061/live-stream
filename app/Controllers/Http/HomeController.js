'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Home = use('App/Models/Home')
const Response = use("App/Helpers/Response");
const Helpers = use('Helpers')
const data = require(`${Helpers.appRoot()}/data.json`)

/**
 * Resourceful controller for interacting with homes
 */
class HomeController {
    /**
     * Show a list of all homes.
     * GET homes
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ view }) {

        const home = await Home.find({ id: 1 })

        const homeDetails = {
            appDownloadLink: home.app_download_link,
            logoSrc: home.logo_src,
            promoteLeftSrc: home.promote_left_src,
            promoteRightSrc: home.promote_right_src,
            bottomProtocol: home.bottom_protocol
        }

        return view.render('desktop', { data: data, homeDetails: homeDetails })
    }

    /**
     * Display a single home.
     * GET homes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ request, response, view }) {

        const home = await Home.find({ id: 1 })

        const homeDetails = {
            appDownloadLink: home.app_download_link,
            logoSrc: home.logo_src,
            promoteLeftSrc: home.promote_left_src,
            promoteRightSrc: home.promote_right_src,
            bottomProtocol: home.bottom_protocol
        }

        return Response(response, { data: homeDetails })

    }

    /**
     * Render a form to be used for creating a new home.
     * GET homes/create
     *
     * @param {object} ctx
     * @param {Request} ctx.requesst
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new home.
     * POST homes
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const {
            appDownloadLink,
            logoSrc,
            promoteLeftSrc,
            promoteRightSrc,
            bottomProtocol
        } = request.all()

        const home = await Home.findOrCreate({ id: 1 })

        home.app_download_link = appDownloadLink
        home.logo_src = logoSrc
        home.promote_left_src = promoteLeftSrc
        home.promote_right_src = promoteRightSrc
        home.bottom_protocol = bottomProtocol

        await home.save()

        return Response(response, {})
    }

    /**
     * Render a form to update an existing home.
     * GET homes/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update home details.
     * PUT or PATCH homes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a home with id.
     * DELETE homes/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = HomeController