'use strict'

const Offer = use('App/Models/Offer')
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const PromoteSetting = use('App/Models/PromoteSetting')

const { validate } = use("Validator");
const Response = use("App/Helpers/Response");

class PromoteController {

    async getPromoteSetting({ request, response }) {
        try {
            const promoteSetting = await PromoteSetting.findBy({ id: 1 })

            return Response(response, { data: promoteSetting.toJSON() })
        } catch (error) {
            return Response(response, {
                message: `找不到该记录`,
                success: false,
                status: 400,
            });
        }

    }

    async savePromoteSetting({ request, response }) {
        const {
            download_button,
            link,
            download_title,
            reserved,
        } = request.all()

        const promoteSetting = await PromoteSetting.findOrCreate({ id: 1 })

        promoteSetting.download_button = download_button
        promoteSetting.link = link
        promoteSetting.download_title = download_title
        promoteSetting.reserved = reserved

        await promoteSetting.save()

        return Response(response, {})
    }

    async getProduct({ request, response }) {

        const product = await Product.all()

        return Response(response, { data: product.toJSON() })
    }

    async saveProduct({ request, response }) {
        const {
            offer_id,
            category_id,
            image,
            title,
            price,
            origin_price,
            sort,
        } = request.all()

        const product = new Product()

        product.offer_id = offer_id
        product.category_id = category_id
        product.image = image
        product.title = title
        product.price = price
        product.origin_price = origin_price
        product.sort = sort

        await product.save()

        return Response(response, {})
    }

    async deleteProduct({ request, response }) {
        const rules = {
            id: "required"
        };

        const {
            id
        } = request.all()

        const validation = await validate({ id }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }
        try {
            const product = await Product.find(id)

            await product.delete()

            return Response(response, {})
        } catch (error) {
            return Response(response, {
                message: `找不到该记录`,
                success: false,
                status: 400,
            });
        }
    }

    async getCategory({ request, response }) {

        const category = await Category.all()

        return Response(response, { data: category.toJSON() })
    }

    async saveCategory({ request, response }) {
        const rules = {
            name: "required"
        };

        const {
            name
        } = request.all()

        const validation = await validate({ name }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }

        const category = new Category()

        category.name = name

        await category.save()

        return Response(response, {})
    }

    async deleteCategory({ request, response }) {
        const rules = {
            id: "required"
        };

        const {
            id
        } = request.all()

        const validation = await validate({ id }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }
        try {
            const category = await Category.find(id)

            await category.delete()

            return Response(response, {})
        } catch (error) {
            return Response(response, {
                message: `找不到该记录`,
                success: false,
                status: 400,
            });
        }
    }



    async getOffer({ request, response }) {

        const offer = await Offer.all()

        return Response(response, { data: offer.toJSON() })
    }

    async saveOffer({ request, response }) {
        const rules = {
            name: "required"
        };

        const {
            name
        } = request.all()

        const validation = await validate({ name }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }

        const offer = new Offer()

        offer.name = name

        await offer.save()

        return Response(response, {})
    }

    async deleteOffer({ request, response }) {
        const rules = {
            id: "required"
        };

        const {
            id
        } = request.all()

        const validation = await validate({ id }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }
        try {
            const offer = await Offer.find(id)

            await offer.delete()

            return Response(response, {})
        } catch (error) {
            return Response(response, {
                message: `找不到该记录`,
                success: false,
                status: 400,
            });
        }
    }
}

module.exports = PromoteController