let nodemailer = require('nodemailer');

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

module.exports.sendMail = function(to, subject, html, cb) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'otp.test.system@gmail.com',
               pass: 'my@password'
           }
       });

    transporter.sendMail({
        from: 'otp.test.system@gmail.com',
        to,
        subject,
        html
    }, function (err, info) {
        if(err)
          cb(err, null)
        else
          cb(null, info)
    });
}

module.exports.OTP = (length) => {
    let text = ''
    let possible = '1234567890987654321234567890'
    for (let i = 0; i < parseInt(length); i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
    return text
}