const User = require("../models/user")
const BlockedToken = require("../models/blockedToken")
const { SUCCESS, ERROR, sendMail, OTP } = require("../../utils/helper");
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../../utils/contants')

module.exports.sendOTP = async function(req, res) {
  const params = req.body
  const user_otp = OTP(6)

  User.findOneAndUpdate({ email: params.email }, {
      $set: {
          email: params.email, 
          otp: user_otp,
          timestamp: new Date()/1000
      }
  }, {
      upsert: true,
      new: true
  })
  .then(data => {
    sendMail(params.email, "Login OTP", `Your OTP is ${user_otp}` , function(err, data) {
        if(err){
            console.log(err)
            return ERROR(res, "Cannot send email", 500 )
        }
        return SUCCESS(res, "OTP Sent", 200)
    })
  })
  .catch(err => {
    return ERROR(res, "Something went wrong:", err.message, 500 )
  })
};

module.exports.signin = async function(req, res) {
  const params = req.body
  if(isNaN(params.otp)){
    return ERROR(res, "Invalid OTP", 403)
  }
  const user = await User.find({ email: params.email, otp: params.otp})
  if(user.length){
    const token = jwt.sign(JSON.parse(JSON.stringify(user[0])), JWT_SECRET, { expiresIn: JWT_EXPIRE})
    return SUCCESS(res, {user: user[0], token} , 200)
  }
  else{
      return ERROR(res, "Wrong OTP", 403)
  }
};

module.exports.updateUser = async function(req, res) {
    const params = req.body
    const updateUser = await User.findOneAndUpdate({ _id: req.user._id }, {
        $set: {
            first_name: params.first_name,
            last_name: params.last_name,
            referral_code: params.referral_code,
            is_first_time: false
        }
    }, {
        new: true
    })

    if(updateUser){
        SUCCESS(res, updateUser, 200)
    }
    else{
        ERROR(res, 'Cannot update admin', 503)
    }
}

module.exports.signout = async function(req, res) {
    BlockedToken.create({
        token: req.headers.token,
        timestamp: new Date()/1000
    })
    SUCCESS(res, "Logged Out", 200)
}

module.exports.getUser = async function(req, res) {
    return SUCCESS(res, req.user, 200)
};