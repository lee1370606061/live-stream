'use strict'

const Task = use('Task')
const GetData = use("App/Helpers/GetData");

class ScheduleIt extends Task {
    static get schedule() {
        return '0 */10 * * * *'
            // return '*/60 * * * * *'
    }

    async handle() {
        // this.info('Task ScheduleIt handle')
        GetData()
    }


}

module.exports = ScheduleIt