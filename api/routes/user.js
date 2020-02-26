module.exports = function(userRoutes) {
    const { login } = require('../controllers/user')
    const { handleToken, asyncMiddleware, checkParamsPOST } = require('../../utils/middleware')

    userRoutes.post('/login', [checkParamsPOST(["username", "password"]), asyncMiddleware(login)]);

}