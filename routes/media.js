const express = require('express');
const router = express.Router();
const { mediaControllers } = require('../controllers');

router.get('/', mediaControllers.getAllMedia);
router.post('/', mediaControllers.addMedia);
router.delete('/:id', mediaControllers.deleteMedia);

module.exports = router;
