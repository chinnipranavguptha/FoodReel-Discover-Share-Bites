const foodModel = require("../models/food");

// Create a food item
async function createFood(req, res) {
    try {
        // req.foodpartner comes from middleware
        const foodPartner = req.foodpartner;

        if (!foodPartner) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Create the food item
        const item = await foodModel.create({
            name: req.body.name, // name should come from request body
            description: req.body.description,
            video: req.body.video,
            foodPartner: foodPartner._id // link food item to logged-in partner
        });

        res.status(201).json({
            message: "Food item has been created.",
            food: item
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating food item", error: err.message });
    }
}

// Get all food items
async function getFoodItem(req, res) {
    try {
        const foodItems = await foodModel.find({});
        console.log(foodItems)

        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching food items", error: err.message });
    }
}

module.exports = { createFood, getFoodItem };