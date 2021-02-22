'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferSchema extends Schema {
    up() {
        this.create('offers', (table) => {
            table.increments()
            table.string('name').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('offers')
    }
}

module.exports = OfferSchema