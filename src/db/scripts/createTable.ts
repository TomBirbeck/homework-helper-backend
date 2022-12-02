import pool from '../index'

await pool.query(
    'CREATE TABLE IF NOT EXISTS student (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VAR CHAR (100), surname VAR CHAR (100), email TEXT, password VAR CHAR(100), code TEXT)'
)

await pool.query(
    'CREATE TABLE IF NOT EXISTS tasks (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, subject VAR CHAR (100), topic VAR CHAR (100), description TEXT, due STRING, completed BOOLEAN, student FOREIGN KEY REFERENCES student(email))'
)

await pool.query(
    'CREATE TABLE IF NOT EXISTS parent (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VAR CHAR (100), surname VAR CHAR 100, email TEXT, password VAR CHAR(100), student_code FOREIGN KEY REFERENCES student(code))'
)
