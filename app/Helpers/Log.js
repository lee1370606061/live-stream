const Logger = use('Logger')
const moment = use('moment');

const Log = {
    error(text) {
        Logger.error(`${moment().format('MM-DD-YYYY hh:mm:ss ')} ${text}`)
    },

    info(text) {
        Logger.info(`${moment().format('MM-DD-YYYY hh:mm:ss ')} ${text}`)
    }
}

module.exports = Log