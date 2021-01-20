const Response = (response, { data = {}, message = 'success', success = true, status = 200 }) => {
    response.status(200).send({
        data: data,
        message: message,
        success: success,
        status: status,
    })
}

module.exports = Response