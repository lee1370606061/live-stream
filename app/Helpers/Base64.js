const Base64 = {
    encode(text) {
        return Buffer.from(encodeURIComponent(text)).toString('base64')
    },

    decode(text) {
        return decodeURIComponent(Buffer.from(text, 'base64').toString('ascii'))
    }
}

module.exports = Base64