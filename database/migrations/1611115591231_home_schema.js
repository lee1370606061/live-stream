'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
    up() {
        this.create('homes', (table) => {
            table.increments()
            table.string('logo_src').nullable()
            table.string('promote_left_src').nullable()
            table.string('promote_right_src').nullable()
            table.text('bottom_protocol').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('homes')
    }
}

module.exports = HomeSchema