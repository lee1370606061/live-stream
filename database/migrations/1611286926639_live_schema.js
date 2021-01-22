'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveSchema extends Schema {
    up() {
        this.table('lives', (table) => {
            table.text('live_sliders').nullable()
            table.string('bottom_promote_link').nullable()
            table.string('right_promote_link').nullable()
        })
    }

    down() {
        this.table('lives', (table) => {
            // reverse alternations
        })
    }
}

module.exports = LiveSchema