
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
    {
        headline: {},
        content: {},
        datePublished: {
            type: Date,
            default: Date.now()
        },
        dateModified: Date,

        comments: [
            {
                text: {},
                date: {
                    type: Date,
                    default: Date.now()
                }
            }
        ],
        category: {}

    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('blog', schema)
