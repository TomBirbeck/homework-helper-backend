import pool from '../index.js';
await pool.query('CREATE TABLE IF NOT EXISTS student (student_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (100), surname VARCHAR (100), email TEXT NOT NULL, student_code TEXT NOT NULL UNIQUE)');
await pool.query('CREATE TABLE IF NOT EXISTS tasks (task_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, subject VARCHAR (100), topic VARCHAR (100), description TEXT, due TEXT, priority VARCHAR(20) DEFAULT "low", completed BOOLEAN, creator_id TEXT REFERENCES student(student_code) ON DELETE CASCADE)');
await pool.query('CREATE TABLE IF NOT EXISTS parent (parent_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (100), surname VARCHAR (100), email TEXT NOT NULL, child_id TEXT REFERENCES student(student_code))');
