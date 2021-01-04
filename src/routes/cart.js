const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");
const { addItemTocart } = require("../controller/cart");
const router = express.Router();
router.post('/user/cart/addtocart',requireSignIn, userMiddleware, addItemTocart)


module.exports = router