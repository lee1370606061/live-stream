'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
    up() {
        this.create('products', (table) => {
            table.increments()
            table.integer('offer_id').unsigned().references('id').inTable('offers')
            table.integer('category_id').unsigned().references('id').inTable('categories')
            table.string('image').nullable()
            table.string('title').nullable()
            table.string('name').nullable()
            table.string('price').nullable()
            table.string('origin_price').nullable()
            table.string('tags').nullable()
            table.string('sort').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('products')
    }
}

module.exports = ProductSchema