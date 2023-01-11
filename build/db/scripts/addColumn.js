import pool from '../index.js';
await pool.query("ALTER TABLE tasks ADD COLUMN priority VARCHAR(20) DEFAULT 'low'");
