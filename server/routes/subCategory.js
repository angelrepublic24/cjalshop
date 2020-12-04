const express = require('express');
var SubCategoryControllers = require('../controllers/subCategory')

const {verifyToken, verifyAdminRole} = require('../middlewares/autenticacion')
var router = express.Router();

router.post('/create-subCategory', verifyToken, SubCategoryControllers.createSubCategory);
router.get('/get-subCategory/:id', verifyToken, SubCategoryControllers.getSubCategory);
router.get('/get-all-subCategory', verifyToken, SubCategoryControllers.getAllSubCategory);
router.put('/update-subCategory/:id', verifyToken, SubCategoryControllers.updateSubCategory);
router.delete('/remove-subCategory/:id',verifyToken, SubCategoryControllers.deleteSubCategory);



module.exports = router;