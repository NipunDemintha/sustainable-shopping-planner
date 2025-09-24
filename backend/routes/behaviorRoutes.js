// Behavior routes
const express = require('express');
const router = express.Router();
const behaviorController = require('../controllers/behaviorController');

router.post('/:userId', behaviorController.logEvent);
router.get('/:userId', behaviorController.getEvents);

module.exports = router;


