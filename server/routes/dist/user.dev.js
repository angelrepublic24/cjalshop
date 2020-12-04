"use strict";

var express = require('express');

var UserControllers = require('../controllers/user');

var router = express.Router();
router.post('/create-user', UserControllers.createUser);
router.get('/get-user/:id', UserControllers.getUser);
router.get('/get-all-user', UserControllers.getAllUsers);
router.put('/update-user/:id', UserControllers.updateUser);
router["delete"]('/remove-user/:id', UserControllers.deleteUser);
module.exports = router;