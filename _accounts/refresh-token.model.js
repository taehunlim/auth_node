
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account"
        },
        token: String,
        expires: Date,
        createdByIp: String,
        revoked: Date,
        revokedByIp: String,
        replaceByIp: String
    },
    {
        timeStamps: true
    }
)

schema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires
})

schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired
})

module.exports = mongoose.model('RefreshToken', schema)
