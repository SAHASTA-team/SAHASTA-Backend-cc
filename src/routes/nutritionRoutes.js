const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/scan', authMiddleware, nutritionController.scan);

module.exports = router;
