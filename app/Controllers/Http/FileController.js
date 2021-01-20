'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')
const Response = use("App/Helpers/Response");

/**
 * Resourceful controller for interacting with files
 */
class FileController {
    async show({ params, response }) {
        const file = await File.findOrFail(params.id)

        return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    }

    /**
     * Create/save a new file.
     * POST files
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

    async store({ request, response }) {
        try {
            if (!request.file('file')) return

            const upload = request.file('file', { size: '20mb' })
            console.log(upload)
            const fileName = `${Date.now()}.${upload.extname}`

            await upload.move(Helpers.tmpPath('uploads'), {
                name: fileName
            })

            if (!upload.moved()) {
                throw upload.error()
            }

            const file = await File.create({
                file: fileName,
                name: upload.clientName,
                type: upload.type,
                subtype: upload.subtype
            })

            const link = `${request.protocol()}://${request.headers().host}/images/${file.id}`

            return Response(response, {
                data: link
            });
        } catch (err) {
            return Response(response, {
                message: `上传失败`,
                success: false,
                status: err.status,
            });
        }
    }
}

module.exports = FileController