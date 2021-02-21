
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
    {
        user: {
            type : Schema.Types.ObjectId,
            ref: "account"
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String
            // data: Buffer,
            // contentsType : String
        },
        comments : [
            {
                user : {
                    type : Schema.Types.ObjectId,
                },
                reply : {
                    type : String,
                    required : true
                },
                handle : {
                    type : String
                },
                date : {
                    type : Date,
                    default : Date.now
                }
            }
        ],
        category: {}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('blog', schema)
