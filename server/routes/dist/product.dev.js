"use strict";

var express = require('express');

var ProductControllers = require('../controllers/product');

var _require = require('../middlewares/autenticacion'),
    verifyToken = _require.verifyToken;

var router = express.Router();
router.post('/create-product', verifyToken, ProductControllers.createProduct);
router.get('/get-product', verifyToken, ProductControllers.getProduct);
router.get('/get-all-product', verifyToken, ProductControllers.getAllProduct);
router.put('/update-product', verifyToken, ProductControllers.updateProduct);
router["delete"]('/remove-product', verifyToken, ProductControllers.deleteProduct);
module.exports = router;