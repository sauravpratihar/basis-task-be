module.exports = function(userRoutes) {
    const { sendOTP, signin, updateUser, signout, getUser } = require('../controllers/user')
    const { handleToken, asyncMiddleware, checkParamsPOST } = require('../../utils/middleware')

    userRoutes.post('/send_otp', [checkParamsPOST(["email"]), asyncMiddleware(sendOTP)])
    userRoutes.post('/signin', [checkParamsPOST(["email", "otp"]), asyncMiddleware(signin)])
    userRoutes.post('/update_user', [handleToken, checkParamsPOST(["first_name", "last_name"]), asyncMiddleware(updateUser)])
    userRoutes.post('/signout', [handleToken, asyncMiddleware(signout)])
    userRoutes.post('/get_user', [handleToken, asyncMiddleware(getUser)])
}