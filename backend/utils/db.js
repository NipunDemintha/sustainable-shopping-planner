// MySQL connection utility
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const promisePool = pool.promise();

async function initSchema() {
  // Users table for static bio/profile data
  await promisePool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      country VARCHAR(128),
      city VARCHAR(128),
      age INT,
      preferences JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  );

  // Behavior events table for dynamic actions
  await promisePool.query(
    `CREATE TABLE IF NOT EXISTS behavior_events (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      event_type VARCHAR(64) NOT NULL,
      event_properties JSON,
      occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user_event (user_id, event_type, occurred_at),
      CONSTRAINT fk_behavior_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  );
}

module.exports = {
  pool,
  promisePool,
  initSchema,
};
