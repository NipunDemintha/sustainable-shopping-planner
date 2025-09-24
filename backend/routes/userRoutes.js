// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes here
router.get('/:id', userController.getUser);
router.post('/', userController.createOrUpdateUser);

module.exports = router;
