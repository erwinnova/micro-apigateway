const express = require('express');
const router = express.Router();
const { userControllers } = require('../controllers');
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, userControllers.getProfile);
router.post('/register', userControllers.registerUser);
router.post('/logout', verifyToken, userControllers.logout);
router.post('/login', userControllers.userLogin);
router.put('/update', verifyToken, userControllers.updateProfile);

module.exports = router;
