const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const { validBodyData, authLogin } = require("../middlewares");

// USER
//register
router.route('/register')
.post(validBodyData, user.register_user)
//register with google
router.route('/google_register')
.post(user.google_register_user)

//verify
router.route('/verify_email')
.post(user.verify_email) // .post(user.verify_email)
router.route("/verify_reset_password")
.post(user.verify_reset_password)

//login
router.route('/login')
.post(user.login_user)
//login with google
router.route('/google_login')
.post(user.google_login_user)

//reset password
router.route('/reset_password')
    .post(user.reset_password)

//check for auth
router.route("/protected")
    .get(authLogin, user.checkAuth);


module.exports = router;
