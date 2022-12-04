import pool from '../index'

await pool.query(
    'CREATE TABLE IF NOT EXISTS student (student_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (100), surname VARCHAR (100), email TEXT, password VARCHAR(100), code TEXT)'
)

await pool.query(
    'CREATE TABLE IF NOT EXISTS tasks (task_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, subject VARCHAR (100), topic VARCHAR (100), description TEXT, due TEXT, completed BOOLEAN, creator_id INT REFERENCES student(student_id) ON DELETE CASCADE)'
)

await pool.query(
    'CREATE TABLE IF NOT EXISTS parent (parent_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (100), surname VARCHAR (100), email TEXT, password VARCHAR(100), child_id INT REFERENCES student(student_id))'
)
