// Behavior controller
const { promisePool } = require('../utils/db');

exports.logEvent = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { event_type, event_properties } = req.body;
    if (Number.isNaN(userId)) return res.status(400).json({ error: 'Invalid user id' });
    if (!event_type) return res.status(400).json({ error: 'event_type is required' });

    await promisePool.query(
      'INSERT INTO behavior_events (user_id, event_type, event_properties) VALUES (?, ?, ?)',
      [userId, event_type, event_properties ? JSON.stringify(event_properties) : null]
    );

    return res.status(201).json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to log event', details: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { event_type, limit = 100 } = req.query;
    if (Number.isNaN(userId)) return res.status(400).json({ error: 'Invalid user id' });

    const sql = event_type
      ? 'SELECT * FROM behavior_events WHERE user_id = ? AND event_type = ? ORDER BY occurred_at DESC LIMIT ?'
      : 'SELECT * FROM behavior_events WHERE user_id = ? ORDER BY occurred_at DESC LIMIT ?';
    const params = event_type ? [userId, event_type, Number(limit)] : [userId, Number(limit)];
    const [rows] = await promisePool.query(sql, params);

    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch events', details: err.message });
  }
};


