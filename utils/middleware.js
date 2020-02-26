const { JWT_SECRET } = require('../utils/contants')
const { SUCCESS, ERROR } = require("../utils/helper");
const jwt = require('jsonwebtoken');

module.exports.asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        console.log('err',err)
        return ERROR(res, err.message, 500)
      });
  };

module.exports.handleToken = async (req, res, next) => {
  try{
    if(req.headers["token"]){
      const user = jwt.verify(req.headers["token"], JWT_SECRET)
      console.log('xx',user)
      req.user = user
      next()
    }
    else{
      return ERROR(res, 'Unauthorized', 403)
    }
  }
  catch(e){
    console.log(e)
    return ERROR(res, 'Unauthorized: ' + e.ERROR, 403)


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
        // // console.log(req)
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