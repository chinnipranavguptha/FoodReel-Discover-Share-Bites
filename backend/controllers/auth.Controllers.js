const Genre = require("../models/Genre");
const FoodPartner = require('../models/foodpartner')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register Normal User
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const isUserAlreadyExists = await Genre.findOne({ email });

        if (isUserAlreadyExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Genre.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, email: user.email }, "09edd64a50da904c11d6774c3d829ad42e185051");

        res.cookie('token', token);
        res.status(201).json({
            message: "User register successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        console.error('registerUser error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

// Login Normal User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Genre.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, "09edd64a50da904c11d6774c3d829ad42e185051");

        res.cookie('token', token);
        res.status(200).json({
            message: "User login successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        console.error('loginUser error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

// Logout
async function logoutUser(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logout successfully" });
    } catch (err) {
        console.error('logoutUser error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}
//partner user
async function userfoodpartner(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if partner already exists
        const isAccountAlreadyExists = await FoodPartner.findOne({ email });
        if (isAccountAlreadyExists) {
            return res.status(409).json({ message: "Food Partner Account already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create food partner
        const partner = await FoodPartner.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: partner._id, email: partner.email }, "09edd64a50da904c11d6774c3d829ad42e185051");

        // Send cookie + response
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({
            message: "Food partner registered successfully",
            partner: {
                _id: partner._id,
                email: partner.email,
                name: partner.name
            }
        });
    } catch (err) {
        console.error('userfoodpartner error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

//partner login
async function loginfoodpartner(req, res) {
    try {
        const { email, password } = req.body;

        // Find the food partner
        const foodpartner = await FoodPartner.findOne({ email });
        if (!foodpartner) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, foodpartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: foodpartner._id, email: foodpartner.email }, "09edd64a50da904c11d6774c3d829ad42e185051");

        // Set cookie and return response
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            message: "Food partner login successfully",
            partner: {
                _id: foodpartner._id,
                email: foodpartner.email,
                name: foodpartner.name
            }
        });
    } catch (err) {
        console.error('loginfoodpartner error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

//partner logout

async function logoutfoodpartner(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Food partner logout successfully" });
    } catch (err) {
        console.error('logoutfoodpartner error:', err.stack || err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
}

module.exports = { registerUser, loginUser, logoutUser, userfoodpartner, loginfoodpartner, logoutfoodpartner }