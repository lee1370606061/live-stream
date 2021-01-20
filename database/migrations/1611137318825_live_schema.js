'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveSchema extends Schema {
    up() {
        this.create('lives', (table) => {
            table.increments()
            table.string('bottom_promote_src').nullable()
            table.string('right_promote_src').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('lives')
    }
}

module.exports = LiveSchema