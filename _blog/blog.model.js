
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}

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
        timestamps: true
    }
)

module.exports = mongoose.model('blog', schema)
