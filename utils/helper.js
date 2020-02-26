module.exports.SUCCESS = function(res, message, response_code = 200) {
    return res.status(response_code).send({
        success: true,
        message,
        response_code
    })
}

module.exports.ERROR = function(res, message, response_code = 500) {
    return res.status(response_code).send({
        success: false,
        message,
        response_code
    })
}