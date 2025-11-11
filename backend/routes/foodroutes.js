const express = require("express")
const foodcontroller = require("../controllers/foodcontrollers");
const authfoodmiddleware = require("../middlewares/auth")
const router = express.Router();


router.post("/", authfoodmiddleware.authfoodmiddleware, foodcontroller.createFood);
router.get("/", foodcontroller.getFoodItem)





module.exports = router;