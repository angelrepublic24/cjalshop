const express = require('express');
var ProductControllers = require('../controllers/product');
var {verifyToken, verifyAdminRole} = require('../middlewares/autenticacion')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' })

var router = express.Router();


router.post('/create-product', verifyToken, ProductControllers.createProduct);
router.get('/get-product/:id', verifyToken, ProductControllers.getProduct);
router.get('/getAllProduct', ProductControllers.getAllProduct);
router.put('/update-product/:id', verifyToken, ProductControllers.updateProduct);
router.delete('/remove-product/:id', verifyToken, ProductControllers.deleteProduct);
router.post('/uploadImage/:id', multipartMiddleware, ProductControllers.uploadImage);
router.get('/getImage/:image', multipartMiddleware, ProductControllers.getImageFile)




module.exports = router;