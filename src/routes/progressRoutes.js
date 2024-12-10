const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, progressController.addProgress);
router.get('/history/:childId', authMiddleware, progressController.getProgressHistory);


module.exports = router;
