const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    userfoodpartner,
    loginfoodpartner,
    logoutfoodpartner
} = require('../controllers/auth.Controllers');
const foodPartnerSchema = require('../models/foodpartner');

const router = express.Router();

//user routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);


//partner routes
router.post("/userfoodpartner", userfoodpartner);
router.post("/loginfoodpartner", loginfoodpartner);
router.post("/logoutfoodpartner", logoutfoodpartner);



module.exports = router;