// Auth controller
const { promisePool } = require('../utils/db');

exports.login = async (req, res) => {
  // Placeholder: identify user by email only (prototype)
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });
    const [rows] = await promisePool.query('SELECT id, email FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.register = async (req, res) => {
  // Prototype: delegate to upsert in users table
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });
    const [existing] = await promisePool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(409).json({ error: 'User already exists' });
    const [result] = await promisePool.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name || null]);
    const [rows] = await promisePool.query('SELECT id, email, name FROM users WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Register failed', details: err.message });
  }
};
