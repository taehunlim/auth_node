
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
    {
        user: {
            type : Schema.Types.ObjectId,
            ref: "account"
        },
        handle: {
            type: String,
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
                    ref: "account"
                },
                comment : {
                    type : String,
                    required : true
                },
                handle : {
                    type : String,
                    ref: "account"
                },
                date : {
                    type : Date,
                    default : Date.now
                },
                replies: [
                    {
                        user : {
                            type : Schema.Types.ObjectId,
                            ref: "account"
                        },
                        reply : {
                            type : String,
                            required : true
                        },
                        handle : {
                            type : String,
                            ref: "account"
                        },
                        date : {
                            type : Date,
                            default : Date.now
                        }
                    }
                ]
            }
        ],
        category: {
            mainCategory: {
                type: String,
                required: true
            },
            subcategory: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('blog', schema)
