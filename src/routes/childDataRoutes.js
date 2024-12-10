const express = require('express');
const router = express.Router();
const childDataController = require('../controllers/childDataController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-or-update', authMiddleware, childDataController.addOrUpdateChild);

module.exports = router;
