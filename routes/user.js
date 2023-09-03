const express = require("express");
const router = express();
const {registerUser, loginuser, logoutUser} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");
const BASE_URL = process.env.BASE_URL 
router.post(`${BASE_URL}/registration`,registerUser)
router.post(`${BASE_URL}/login`,loginuser)
router.post(`${BASE_URL}/logout`,isAuth ,logoutUser)
module.exports=router;