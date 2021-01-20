'use strict'

const Task = use('Task')
const Crawler = require("crawler");
const fs = require('fs');

class ScheduleIt extends Task {
    static get schedule() {
        return '0 0 */23 * * *'
            // return '*/60 * * * * *'
    }

    async handle() {
        // this.info('Task ScheduleIt handle')
        console.log('run')

        const c = new Crawler({
            encoding: null,
            jQuery: true, // set false to suppress warning message.
            callback: function(err, res, done) {
                if (err) {
                    console.error(err.stack);
                } else {
                    const $ = res.$
                    const data = {
                        today: [],
                        tomorrow: [],
                        afterTomorrow: [],
                        nextDay: [],
                    }
                    for (const iterator of $('.todayMatch .contenTab').toArray()) {
                        data.today.push({
                            timer: $(iterator).find('.timer').html().trim(),
                            matchType: $(iterator).find('.matchType').html().trim(),
                            team: $(iterator).find('.team').html().trim(),
                            mylist: $(iterator).find('.myList').html().trim(),
                        })
                    }

                    for (const iterator of $('.tomorrowMatch .contenTab').toArray()) {
                        data.tomorrow.push({
                            timer: $(iterator).find('.timer').html().trim(),
                            matchType: $(iterator).find('.matchType').html().trim(),
                            team: $(iterator).find('.team').html().trim(),
                            mylist: $(iterator).find('.myList').html().trim(),
                        })
                    }

                    for (const iterator of $('.afterTomorrowMatch .contenTab').toArray()) {
                        data.afterTomorrow.push({
                            timer: $(iterator).find('.timer').html().trim(),
                            matchType: $(iterator).find('.matchType').html().trim(),
                            team: $(iterator).find('.team').html().trim(),
                            mylist: $(iterator).find('.myList').html().trim(),
                        })
                    }

                    for (const iterator of $('.nextDayMatch .contenTab').toArray()) {
                        data.nextDay.push({
                            timer: $(iterator).find('.timer').html().trim(),
                            matchType: $(iterator).find('.matchType').html().trim(),
                            team: $(iterator).find('.team').html().trim(),
                            mylist: $(iterator).find('.myList').html().trim(),
                        })
                    }
                    fs.createWriteStream(res.options.filename).write(JSON.stringify(data));
                }

                done();
            }
        });

        c.queue({
            uri: "http://jrskqw.cc/",
            filename: 'data.json'
        });
    }


}

module.exports = ScheduleIt