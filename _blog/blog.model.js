
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
    {
        writer: {
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
        datePublished: Date,
        dateModified: Date,

        comments: [
            {
                text: {
                    type: String,
                    required: true
                },
                date: Date
            }
        ],
        category: {}
    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('blog', schema)
