const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxLenght: 32,
            unique: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        }
    }, {
        timestamps: true
    }

)
module.exports = mongoose.model("Genre", genreSchema)