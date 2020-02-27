const mongoose = require('mongoose');

const blockedTokenSchema = mongoose.Schema({
    token: { 
        type: String,
    },
    timestamp: {
        type: Number
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model('blocked_token', blockedTokenSchema);