import pool from '../index'

await pool.query("ALTER TABLE tasks ADD COLUMN priority TEXT(10) DEFAULT 'low'")