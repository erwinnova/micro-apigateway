const { refreshTokenControllers } = require('../controllers')
const express = require('express');
const router = express.Router();

router.post('/', refreshTokenControllers.refreshToken)

module.exports = router