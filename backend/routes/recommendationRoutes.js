// Recommendation routes
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Define recommendation routes here
router.get('/:userId', recommendationController.getRecommendations);

module.exports = router;
