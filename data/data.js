const Crawler = require("crawler");
const fs = require('fs');

const crawler = new Crawler({
    encoding: null,
    jQuery: true, // set false to suppress warning message.
    callback: async function(err, res, done) {
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
            let countToday = 0
            let countTomorrow = 0
            let countAfterTomorrow = 0
            let countNextDay = 0

            for (const iterator of $('.todayMatch .contenTab').toArray()) {
                let videoDetails = {}
                if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                }

                data.today.push({
                    id: countToday,
                    videoDetails: videoDetails.video,
                    details: videoDetails.details,
                    timer: $(iterator).find('.timer').html().trim(),
                    matchType: $(iterator).find('.matchType').html().trim(),
                    team: $(iterator).find('.team').html().trim(),
                    mylist: $(iterator).find('.myList').html().trim(),
                    hot: $(iterator).find('.hot').html() !== null,
                    isStream: $(iterator).find('.notBegin').html() === null,
                    attr: $(iterator).find('.listBox')[0].attribs
                })

                countToday++
            }

            for (const iterator of $('.tomorrowMatch .contenTab').toArray()) {
                let videoDetails = {}
                if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                }

                data.tomorrow.push({
                    id: countTomorrow,
                    videoDetails: videoDetails.video,
                    details: videoDetails.details,
                    timer: $(iterator).find('.timer').html().trim(),
                    matchType: $(iterator).find('.matchType').html().trim(),
                    team: $(iterator).find('.team').html().trim(),
                    mylist: $(iterator).find('.myList').html().trim(),
                    hot: $(iterator).find('.hot').html() !== null,
                    isStream: $(iterator).find('.notBegin').html() === null,
                    attr: $(iterator).find('.listBox')[0].attribs
                })

                countTomorrow++
            }

            for (const iterator of $('.afterTomorrowMatch .contenTab').toArray()) {
                let videoDetails = {}
                if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                }

                data.afterTomorrow.push({
                    id: countAfterTomorrow,
                    videoDetails: videoDetails.video,
                    details: videoDetails.details,
                    timer: $(iterator).find('.timer').html().trim(),
                    matchType: $(iterator).find('.matchType').html().trim(),
                    team: $(iterator).find('.team').html().trim(),
                    mylist: $(iterator).find('.myList').html().trim(),
                    hot: $(iterator).find('.hot').html() !== null,
                    isStream: $(iterator).find('.notBegin').html() === null,
                    attr: $(iterator).find('.listBox')[0].attribs
                })

                countAfterTomorrow++
            }

            for (const iterator of $('.nextDayMatch .contenTab').toArray()) {
                let videoDetails = {}
                if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                }

                data.nextDay.push({
                    id: countNextDay,
                    videoDetails: videoDetails.video,
                    details: videoDetails.details,
                    timer: $(iterator).find('.timer').html().trim(),
                    matchType: $(iterator).find('.matchType').html().trim(),
                    team: $(iterator).find('.team').html().trim(),
                    mylist: $(iterator).find('.myList').html().trim(),
                    hot: $(iterator).find('.hot').html() !== null,
                    isStream: $(iterator).find('.notBegin').html() === null,
                    attr: $(iterator).find('.listBox')[0].attribs
                })

                countNextDay++
            }
            fs.createWriteStream(res.options.filename).write(JSON.stringify(data));
        }

        done();
    }
});

crawler.queue({
    uri: "http://jrskqw.cc/",
    filename: '../data.json'
});

function getVideoDetails(uri) {
    const url = `http://jrskqw.cc${uri}`
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
            encoding: null,
            jQuery: true, // set false to suppress warning message.
            callback: function(err, res, done) {
                if (err) {
                    console.error(err.stack);
                } else {
                    const $ = res.$
                    resolve({ video: $('iframe')[0].attribs, details: $($('.msg')).find('ul').html() })
                }
                done();
            }
        });

        crawler.queue({
            uri: url,
        });
    })

}