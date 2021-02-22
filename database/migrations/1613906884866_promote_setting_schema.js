'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromoteSettingSchema extends Schema {
    up() {
        this.create('promote_settings', (table) => {
            table.increments()
            table.string('download_button').nullable()
            table.string('link').nullable()
            table.string('download_title').nullable()
            table.string('reserved').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('promote_settings')
    }
}

module.exports = PromoteSettingSchema