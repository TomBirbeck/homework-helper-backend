import pool from '../index'

await pool.query("ALTER TABLE tasks ADD COLUMN deleted Boolean DEFAULT false")