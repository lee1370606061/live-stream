'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveSchema extends Schema {
    up() {
        this.create('lives', (table) => {
            table.increments()
            table.text('live_sliders').nullable()
            table.string('bottom_promote_src').nullable()
            table.string('bottom_promote_link').nullable()
            table.string('right_promote_src').nullable()
            table.string('right_promote_link').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('lives')
    }
}

module.exports = LiveSchema