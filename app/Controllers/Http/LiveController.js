'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Live = use('App/Models/Live')
const Home = use('App/Models/Home')
const Response = use("App/Helpers/Response");
const Helpers = use('Helpers')
const data = require(`${Helpers.appRoot()}/data.json`)


/**
 * Resourceful controller for interacting with lives
 */
class LiveController {
    /**
     * Show a list of all lives.
     * GET lives
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ params, view }) {

        const live = await Live.find({ id: 1 })
        const home = await Home.find({ id: 1 })

        const liveDetails = {
            bottomPromoteSrc: live.bottom_promote_src,
            rightPromoteSrc: live.right_promote_src
        }

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
        return view.render('live', { data: result, liveDetails: liveDetails, homeDetails: homeDetails })
    }

    /**
     * Render a form to be used for creating a new live.
     * GET lives/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new live.
     * POST lives
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const {
            bottomPromoteSrc,
            rightPromoteSrc
        } = request.all()

        const live = await Live.findOrCreate({ id: 1 })

        live.bottom_promote_src = bottomPromoteSrc
        live.right_promote_src = rightPromoteSrc

        await live.save()

        return Response(response, {})
    }

    /**
     * Display a single live.
     * GET lives/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {

        const live = await Live.find({ id: 1 })

        const liveDetails = {
            bottomPromoteSrc: live.bottom_promote_src,
            rightPromoteSrc: live.right_promote_src
        }

        return Response(response, { data: liveDetails })
    }

    /**
     * Render a form to update an existing live.
     * GET lives/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update live details.
     * PUT or PATCH lives/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a live with id.
     * DELETE lives/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = LiveController