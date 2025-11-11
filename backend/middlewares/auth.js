const FoodPartner = require("../models/foodpartner"); // ✅ Correct model reference
const jwt = require("jsonwebtoken");

async function authfoodmiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(token, "09edd64a50da904c11d6774c3d829ad42e185051");

        const partner = await FoodPartner.findById(decoded.id); // ✅ Correct call

        if (!partner) {
            return res.status(401).json({ message: "Partner not found" });
        }

        req.foodpartner = partner; // ✅ Attach to req
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { authfoodmiddleware };