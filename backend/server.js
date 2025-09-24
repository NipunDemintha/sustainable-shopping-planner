// Express server setup
const express = require('express');
const app = express();
const { initSchema } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const behaviorRoutes = require('./routes/behaviorRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Middleware, routes, etc.
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/behavior', behaviorRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Initialize DB schema then start server
(async () => {
  try {
    await initSchema();
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (err) {
    console.error('Failed to initialize schema', err);
    process.exit(1);
  }
})();
