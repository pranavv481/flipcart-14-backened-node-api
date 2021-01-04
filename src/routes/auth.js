const express = require("express");
const { signup, signin } = require("../controller/auth");
const router = express.Router();
const User = require("../models/user");
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require("../validator/auth");

router.post('/signin', validateSigninRequest, isRequestValidated, signin)

router.post('/signup',validateSignupRequest,isRequestValidated, signup)
// router.post('/profile', requireSignIn)

module.exports = router
