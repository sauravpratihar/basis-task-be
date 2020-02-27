const { JWT_SECRET } = require('../utils/contants')
const { SUCCESS, ERROR } = require("../utils/helper")
const jwt = require('jsonwebtoken')
const User = require('../api/models/user')
const BlockedToken = require("../api/models/blockedToken")

module.exports.asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        return ERROR(res, err, 500)
      });
  };

module.exports.handleToken = async (req, res, next) => {
  try{
    if(req.headers["token"]){
      const isBlocked = (await BlockedToken.find({ token: req.headers["token"] })).length
      if(isBlocked){
        return ERROR(res, 'Expired Token', 403)
      }
      const user = jwt.verify(req.headers["token"], JWT_SECRET)
      req.user = await User.findOne({_id: user._id})
      next()
    }
    else{
      return ERROR(res, 'Unauthorized', 403)
    }
  }
  catch(e){
    return ERROR(res, 'Unauthorized: ' + e.message, 403)
  }
}

module.exports.checkParamsGET = (arr) => {
    return (req, res, next) => {
        let missing_params = []
        for (let i = 0; i < arr.length; i++) {
            if (!eval('req.query.' + arr[i])) {
                missing_params.push(arr[i])
            }
        }
        if (missing_params.length == 0) {
            next()
        } else {
            next(res.json(SUCCESS(res, 'Parameter(s) missing: ' + missing_params.join(','), 400)))
        }
    }
}

module.exports.checkParamsPOST = (arr) => {
    return (req, res, next) => {
        let missing_params = []
        for (let i = 0; i < arr.length; i++) {
            if (!eval('req.body.' + arr[i])) {
                missing_params.push(arr[i])
            }
        }
        if (missing_params.length == 0) {
            next()
        } else {
            next(res.json(SUCCESS(res, 'Parameter(s) missing: ' + missing_params.join(','), 400)))
        }
    }
}