'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
    up() {
        this.table('homes', (table) => {
            table.string('app_download_link').nullable()
        })
    }

    down() {
        this.table('homes', (table) => {
            // reverse alternations
        })
    }
}

module.exports = HomeSchema