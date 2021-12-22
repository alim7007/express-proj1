const express = require('express');
const router = express.Router();
const { checkAuth } = require('../controllers/user.js');
const { authLogin } = require('../middlewares')

// home page
router.route('/protected')
.get(authLogin, checkAuth)


module.exports = router;
