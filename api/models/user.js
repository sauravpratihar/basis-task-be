const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: { 
        type: String,
    },
    last_name: { 
        type: String,
    },
    email: { 
        type: String,
    },
    otp: { 
        type: Number,
    },
    my_referral_code: {
        type: String,
    },
    referral_code: {
        type: String,
    },
    referral_user_id: {
        type: String,
    },
    is_first_time: {
        type: Boolean,
        default: true
    },
    timestamp: {
        type: Number
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model('user', userSchema);