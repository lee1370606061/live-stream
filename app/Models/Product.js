'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    offer() {
        return this.hasMany('App/Models/Offer')
    }

    category() {
        return this.hasMany('App/Models/Category')
    }
}

module.exports = Product