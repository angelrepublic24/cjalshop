"use strict";

var express = require('express');

var CompanyControllers = require('../controllers/company');

var _require = require('../middlewares/autenticacion'),
    verifyToken = _require.verifyToken,
    verifyAdminRole = _require.verifyAdminRole;

var router = express.Router();
router.post('/create-company', verifyToken, CompanyControllers.createCompany);
router.get('/get-company', verifyToken, CompanyControllers.getCompany);
router.get('/get-all-company', verifyToken, CompanyControllers.getAllCompany);
router.put('/update-company', verifyToken, CompanyControllers.updateCompany);
router["delete"]('/remove-company', verifyToken, CompanyControllers.deleteCompany);
module.exports = router;