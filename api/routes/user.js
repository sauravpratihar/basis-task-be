module.exports = function(userRoutes) {
    const { sendOTP, signin, updateUser } = require('../controllers/user')
    const { handleToken, asyncMiddleware, checkParamsPOST } = require('../../utils/middleware')

    // userRoutes.post('/login', [checkParamsPOST(["username", "password"]), asyncMiddleware(login)]);
    userRoutes.post('/send_otp', [checkParamsPOST(["email"]), sendOTP])
    userRoutes.post('/signin', [checkParamsPOST(["email", "otp"]), signin])
    userRoutes.post('/update_user', [handleToken, checkParamsPOST(["first_name", "last_name"]), updateUser])



}