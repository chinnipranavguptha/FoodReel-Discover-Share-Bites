const mongoose = require('mongoose')
const FoodPartner = require('../models/foodpartner')


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    video: {
        type: String,
        required: true

    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }
})

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel