"use strict";

var express = require('express');

var LoginControllers = require('../controllers/login');

var _require = require('../middlewares/autenticacion'),
    verifyToken = _require.verifyToken;

var router = express.Router();
router.post('/login', LoginControllers.loginUser);
router.post('/google-login', verifyToken, LoginControllers.googleLogin);
module.exports = router;