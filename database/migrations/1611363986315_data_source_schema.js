'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataSourceSchema extends Schema {
    up() {
        this.create('data_sources', (table) => {
            table.increments()
            table.text('yesterday', 'longtext').nullable()
            table.text('today', 'longtext').nullable()
            table.text('tomorrow', 'longtext').nullable()
            table.text('after_tomorrow', 'longtext').nullable()
            table.text('next_day_after_tomorrow', 'longtext').nullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('data_sources')
    }
}

module.exports = DataSourceSchema