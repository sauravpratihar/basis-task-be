module.exports = function(express, app) {
    const user = require('./routes/user')
    const userRoutes = express.Router()
    app.use('/user', userRoutes)
    user(userRoutes)
    
}