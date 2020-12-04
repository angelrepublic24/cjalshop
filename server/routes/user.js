const express = require('express');
const UserControllers = require('../controllers/user');
const {verifyToken, verifyAdminRole} = require('../middlewares/autenticacion')

let router = express.Router();


router.post('/signup', verifyToken, UserControllers.createUser);
router.get('/get-user/:id', verifyToken, UserControllers.getUser);
router.get('/get-all-user', verifyToken, UserControllers.getAllUsers);
router.put('/update-user/:id', verifyToken, UserControllers.updateUser);
router.delete('/remove-user/:id', verifyToken, UserControllers.deleteUser);



module.exports = router;