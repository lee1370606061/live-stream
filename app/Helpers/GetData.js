const Crawler = require("crawler");
const fs = require('fs');
const moment = require('moment');
const Response = use("App/Helpers/Response");
const Helpers = use('Helpers')

const GetData = () => {
    const crawler = new Crawler({
        encoding: null,
        jQuery: true, // set false to suppress warning message.
        headers: {
            userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        },
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

                for (const iterator of $('.todayMatch .listBox').toArray()) {
                    let videoDetails = {}
                        // if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('.status > a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                        // }

                    data.todayTimes = {
                            day: moment().format('DD'),
                            month: moment().format('MM'),
                            year: moment().format('YYYY'),
                        },

                        data.today.push({
                            id: countToday,
                            isStream: $(iterator).find('.notBegin').html() === null,
                            attr: iterator.attribs,
                            hot: iterator.attribs.hot === '1',
                            football: videoDetails.video && videoDetails.video.src.includes('sportlive.cc') || false,
                            basketball: videoDetails.video && videoDetails.video.src.includes('huolisport.cn') || false,
                            videoDetails: videoDetails,
                            timer: $(iterator).find('.timer').text().trim(),
                            matchType: $(iterator).find('.matchType').text().trim(),
                            teamOne: {
                                name: $(iterator).find('.team p:nth-child(1)').text(),
                                image: $(iterator).find('.team p:nth-child(1) > img')[0].attribs.src,
                            },
                            teamTwo: {
                                name: $(iterator).find('.team p:nth-child(3)').text(),
                                image: $(iterator).find('.team p:nth-child(3) > img')[0].attribs.src,
                            },
                            score: $(iterator).find('.team .score').html()
                        })

                    countToday++
                }

                for (const iterator of $('.tomorrowMatch .contenTab').toArray()) {
                    let videoDetails = {}
                        // if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                        // }

                    data.tomorrowTimes = {
                            day: moment().add(1, 'days').format('DD'),
                            month: moment().add(1, 'days').format('MM'),
                            year: moment().add(1, 'days').format('YYYY'),
                        },

                        data.tomorrow.push({
                            id: countTomorrow,
                            isStream: $(iterator).find('.notBegin').html() === null,
                            attr: iterator.attribs,
                            hot: iterator.attribs.hot === '1',
                            football: videoDetails.video && videoDetails.video.src.includes('sportlive.cc') || false,
                            basketball: videoDetails.video && videoDetails.video.src.includes('huolisport.cn') || false,
                            videoDetails: videoDetails,
                            timer: $(iterator).find('.timer').text().trim(),
                            matchType: $(iterator).find('.matchType').text().trim(),
                            teamOne: {
                                name: $(iterator).find('.team p:nth-child(1)').text(),
                                image: $(iterator).find('.team p:nth-child(1) > img')[0].attribs.src,
                            },
                            teamTwo: {
                                name: $(iterator).find('.team p:nth-child(3)').text(),
                                image: $(iterator).find('.team p:nth-child(3) > img')[0].attribs.src,
                            },
                            score: $(iterator).find('.team .score').html()
                        })

                    countTomorrow++
                }

                for (const iterator of $('.afterTomorrowMatch .contenTab').toArray()) {
                    let videoDetails = {}
                        // if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                        // }

                    data.afterTomorrowTimes = {
                            day: moment().add(2, 'days').format('DD'),
                            month: moment().add(2, 'days').format('MM'),
                            year: moment().add(2, 'days').format('YYYY'),
                        },

                        data.afterTomorrow.push({
                            id: countAfterTomorrow,
                            isStream: $(iterator).find('.notBegin').html() === null,
                            attr: iterator.attribs,
                            hot: iterator.attribs.hot === '1',
                            football: videoDetails.video && videoDetails.video.src.includes('sportlive.cc') || false,
                            basketball: videoDetails.video && videoDetails.video.src.includes('huolisport.cn') || false,
                            videoDetails: videoDetails,
                            timer: $(iterator).find('.timer').text().trim(),
                            matchType: $(iterator).find('.matchType').text().trim(),
                            teamOne: {
                                name: $(iterator).find('.team p:nth-child(1)').text(),
                                image: $(iterator).find('.team p:nth-child(1) > img')[0].attribs.src,
                            },
                            teamTwo: {
                                name: $(iterator).find('.team p:nth-child(3)').text(),
                                image: $(iterator).find('.team p:nth-child(3) > img')[0].attribs.src,
                            },
                            score: $(iterator).find('.team .score').html()
                        })

                    countAfterTomorrow++
                }

                for (const iterator of $('.nextDayMatch .contenTab').toArray()) {
                    let videoDetails = {}
                        // if ($(iterator).find('.notBegin').html() === null) {
                    const uri = $(iterator).find('a')[0].attribs.href
                    videoDetails = await getVideoDetails(uri)
                        // }

                    data.nextDayTimes = {
                            day: moment().add(3, 'days').format('DD'),
                            month: moment().add(3, 'days').format('MM'),
                            year: moment().add(3, 'days').format('YYYY'),
                        },


                        data.nextDay.push({
                            id: countNextDay,
                            isStream: $(iterator).find('.notBegin').html() === null,
                            attr: iterator.attribs,
                            hot: iterator.attribs.hot === '1',
                            football: videoDetails.video && videoDetails.video.src.includes('sportlive.cc') || false,
                            basketball: videoDetails.video && videoDetails.video.src.includes('huolisport.cn') || false,
                            videoDetails: videoDetails,
                            timer: $(iterator).find('.timer').text().trim(),
                            matchType: $(iterator).find('.matchType').text().trim(),
                            teamOne: {
                                name: $(iterator).find('.team p:nth-child(1)').text(),
                                image: $(iterator).find('.team p:nth-child(1) > img')[0].attribs.src,
                            },
                            teamTwo: {
                                name: $(iterator).find('.team p:nth-child(3)').text(),
                                image: $(iterator).find('.team p:nth-child(3) > img')[0].attribs.src,
                            },
                            score: $(iterator).find('.team .score').html()
                        })

                    countNextDay++
                }
                console.log(`run${new Date().toLocaleTimeString()}`)
                try {
                    fs.createWriteStream(res.options.filename).write(JSON.stringify(data));
                } catch (error) {
                    console.log(error)
                }

            }

            done();
        }
    });

    crawler.queue({
        uri: "http://jrskqw.cc/",
        filename: `${Helpers.appRoot()}/data.json`
    });

    function getVideoDetails(uri) {
        const url = `http://jrskqw.cc/${uri}`
        return new Promise((resolve, reject) => {
            const crawler = new Crawler({
                encoding: null,
                jQuery: true, // set false to suppress warning message.
                callback: function(err, res, done) {
                    if (err) {
                        console.error(err.stack);
                    } else {
                        const $ = res.$
                        resolve({
                            video: $('iframe')[0].attribs,
                            details: {
                                time: $('.timer .t').html(),
                                times: $('.timer ._t').html(),
                                scoreHome: $('.score .home').html(),
                                scoreVisit: $('.score .visit').html(),
                            }
                        })
                    }
                    done();
                }
            });

            crawler.queue({
                uri: url,
            });
        })

    }
}

module.exports = GetData