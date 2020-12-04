const express = require('express');
const BranchOfficeControllers = require('../controllers/branchOffice')
let{verifyToken, verifyAdminRole} = require('../middlewares/autenticacion')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' })

let router = express.Router();

router.post('/create-branchOffice', [verifyToken, verifyAdminRole], BranchOfficeControllers.createBranchOffice);
router.get('/get-branchOffice/:id', [verifyToken, verifyAdminRole], BranchOfficeControllers.getBranchOffice);
router.get('/get-all-branchOffice', [verifyToken, verifyAdminRole], BranchOfficeControllers.getAllBranchOffice);
router.put('/update-branchOffice/:id', [verifyToken, verifyAdminRole], BranchOfficeControllers.updateBranchOffice);
router.delete('/remove-branchOffice/:id', [verifyToken, verifyAdminRole], BranchOfficeControllers.removeBranchOffice);
router.post('/uploadImage/:id', multipartMiddleware, BranchOfficeControllers.uploadImage);



module.exports = router;