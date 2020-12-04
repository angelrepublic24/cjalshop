"use strict";

var express = require('express');

var CategoryControllers = require('../controllers/category');

var _require = require('../middlewares/autenticacion'),
    verifyToken = _require.verifyToken,
    verifyAdminRole = _require.verifyAdminRole;

var router = express.Router();
router.post('/create-category', verifyToken, CategoryControllers.createCategory);
router.get('/get-category', verifyToken, CategoryControllers.getCategory);
router.get('/get-all-category', verifyToken, CategoryControllers.getAllCategory);
router.put('/update-category', verifyToken, CategoryControllers.updateCategory);
router["delete"]('/remove-category', verifyToken, CategoryControllers.deleteCategory);
module.exports = router;