'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
    up() {
        this.table('homes', (table) => {
            // alter table
            table.string('title_logo_src').nullable()
            table.string('title').nullable()
            table.string('seo_keywords').nullable()
            table.string('seo_description').nullable()
            table.string('foot_promote_top').nullable()
            table.string('foot_promote_bottom').nullable()
        })
    }

    down() {
        this.table('homes', (table) => {
            // reverse alternations
        })
    }
}

module.exports = HomeSchema