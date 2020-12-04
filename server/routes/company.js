const express = require('express');
var CompanyControllers = require('../controllers/company');
var {verifyToken, verifyAdminRole} = require('../middlewares/autenticacion')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' })

var router = express.Router();


router.post('/create-company', [verifyToken, verifyAdminRole], CompanyControllers.createCompany);
router.get('/get-company/:id', verifyToken, CompanyControllers.getCompany);
router.get('/get-all-company', verifyToken, CompanyControllers.getAllCompany);
router.put('/update-company/:id', verifyToken, CompanyControllers.updateCompany);
router.delete('/remove-company/:id', verifyToken, CompanyControllers.deleteCompany);
router.post('/uploadImage/:id', multipartMiddleware, CompanyControllers.uploadImage);



module.exports = router;