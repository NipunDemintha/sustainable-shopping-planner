// Recommendation controller
const { promisePool } = require('../utils/db');

// Example: fetch user behavior summary to drive recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const [summary] = await promisePool.query(
      `SELECT event_type, COUNT(*) as count
       FROM behavior_events
       WHERE user_id = ?
       GROUP BY event_type
       ORDER BY count DESC`,
      [userId]
    );

    return res.json({ userId, behaviorSummary: summary, recommendations: [] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate recommendations', details: err.message });
  }
};
