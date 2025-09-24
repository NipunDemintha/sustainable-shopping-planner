// User controller
const { promisePool } = require('../utils/db');

exports.getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const [rows] = await promisePool.query('SELECT id, email, name, country, city, age, preferences, created_at, updated_at FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { email, name, country, city, age, preferences } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }
    // Upsert by email
    const [existing] = await promisePool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      const userId = existing[0].id;
      await promisePool.query(
        'UPDATE users SET name = ?, country = ?, city = ?, age = ?, preferences = ? WHERE id = ? ',
        [name || null, country || null, city || null, Number.isFinite(age) ? age : null, preferences ? JSON.stringify(preferences) : null, userId]
      );
      const [rows] = await promisePool.query('SELECT id, email, name, country, city, age, preferences, created_at, updated_at FROM users WHERE id = ?', [userId]);
      return res.json(rows[0]);
    }
    const [result] = await promisePool.query(
      'INSERT INTO users (email, name, country, city, age, preferences) VALUES (?, ?, ?, ?, ?, ?)',
      [email, name || null, country || null, city || null, Number.isFinite(age) ? age : null, preferences ? JSON.stringify(preferences) : null]
    );
    const [rows] = await promisePool.query('SELECT id, email, name, country, city, age, preferences, created_at, updated_at FROM users WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to upsert user', details: err.message });
  }
};
