const express = require('express');
let CategoryControllers = require('../controllers/category');

let {verifyToken, verifyAdminRole} = require('../middlewares/autenticacion');

let router = express.Router();


router.post('/create-category', verifyToken, CategoryControllers.createCategory);
router.get('/get-category/:id', verifyToken, CategoryControllers.getCategory);
router.get('/get-all-category', verifyToken, CategoryControllers.getAllCategory);
router.put('/update-category/:id', verifyToken, CategoryControllers.updateCategory);
router.delete('/remove-category/:id',verifyToken, CategoryControllers.deleteCategory);



module.exports = router;