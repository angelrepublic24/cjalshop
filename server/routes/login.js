const express = require('express')
const LoginControllers = require('../controllers/login')
const {tokenVerify, verifyAdminRole} = require('../middlewares/autenticacion')

let router = express.Router();

router.post('/login', LoginControllers.loginUser)
// router.post('/google-login', LoginControllers.googleLogin)






module.exports = router;