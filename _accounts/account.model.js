const mongoose = require('mongoose');
const role = require('_helper/role');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        handle: {
            type: String,
            required: true
        },
        acceptTerms: Boolean,
        role: {
            type: String,
            default: role.User
        },
        verificationToken: String,
        verified: Date,
        resetToken: {
            token: String,
            expires: Date
        },
        passwordReset: Date
    },
    {
        timeStamps: true
    }
)

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordHash)
})


//
schema.set('toJSON', {
    virtual: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.passwordHash;
    }
})

module.exports = mongoose.model('account', schema)
