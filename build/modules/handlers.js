import pool from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';
export const test = async () => {
    const res = await pool.query(`SELECT * FROM tasks;`);
    return res.rows;
};
export const createNewStudent = async (firstname, surname, email) => {
    const code = uuidv4();
    const res = await pool.query('INSERT INTO student (firstname, surname, email, student_code) VALUES ($1,$2,$3,$4) RETURNING *;', [firstname, surname, email, code]);
    return res.rows;
};
export const createNewParent = async (firstname, surname, email, childId) => {
    const res = await pool.query('INSERT INTO parent (firstname, surname, email, child_id) VALUES ($1,$2,$3,$4) RETURNING *;', [firstname, surname, email, childId]);
    return res.rows;
};
export const createNewTask = async (subject, topic, description, due, priority, completed, creatorId) => {
    const res = await pool.query('INSERT INTO tasks (subject, topic, description, due, priority, completed, creator_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING*;', [subject, topic, description, due, priority, completed, creatorId]);
    return res.rows;
};
export const getAllStudents = async () => {
    const res = await pool.query(`SELECT * FROM student;`);
    return res.rows;
};
export const getStudentById = async (id) => {
    const res = await pool.query(`SELECT * FROM student WHERE student_id=($1);`, [id]);
    return res.rows;
};
export const getStudentByEmail = async (studentEmail) => {
    const res = await pool.query('SELECT * FROM student WHERE email = ($1);', [studentEmail]);
    return res.rows;
};
export const getTasksForStudent = async (creatorId) => {
    const res = await pool.query('SELECT * FROM tasks WHERE creator_id = ($1);', [creatorId]);
    // const res = await pool.query(`SELECT * FROM tasks WHERE creator_id=($1)JOIN student ON creator_id = student_id GROUP BY tasks;`, [studentId])
    return res.rows;
};
export const getParentById = async (parentId) => {
    const res = await pool.query('SELECT * FROM parent WHERE parent_id = ($1);', [parentId]);
    return res.rows;
};
export const getParentByEmail = async (parentEmail) => {
    const res = await pool.query('SELECT * FROM parent WHERE email = ($1);', [parentEmail]);
    return res.rows;
};
export const getStudentTasksForParent = async (creatorId) => {
    const res = await pool.query('SELECT * FROM tasks WHERE creator_id = ($1);', [creatorId]);
    return res.rows;
};
export const updateStudent = async (body, student_id) => {
    const key = Object.keys(body);
    if (key[0] === 'firstname') {
        const res = await pool.query('UPDATE student SET firstname=($1) WHERE student_id=($2) RETURNING*;', [body.firstname, student_id]);
        return res.rows;
    }
    if (key[0] === 'surname') {
        const res = await pool.query('UPDATE student SET surname=($1) WHERE student_id=($2) RETURNING*;', [body.surname, student_id]);
        return res.rows;
    }
    if (key[0] === 'email') {
        const res = await pool.query('UPDATE student SET email=($1) WHERE student_id=($2) RETURNING*;', [body.email, student_id]);
        return res.rows;
    }
};
export const updateParent = async (body, parent_id) => {
    const key = Object.keys(body);
    if (key[0] === 'firstname') {
        const res = await pool.query('UPDATE parent SET firstname=($1) WHERE parent_id=($2) RETURNING*;', [body.firstname, parent_id]);
        return res.rows;
    }
    if (key[0] === 'surname') {
        const res = await pool.query('UPDATE parent SET surname=($1) WHERE parent_id=($2) RETURNING*;', [body.surname, parent_id]);
        return res.rows;
    }
    if (key[0] === 'email') {
        const res = await pool.query('UPDATE parent SET email=($1) WHERE parent_id=($2) RETURNING*;', [body.email, parent_id]);
        return res.rows;
    }
    if (key[0] === 'child_id') {
        const res = await pool.query('UPDATE parent SET child_id=($1) WHERE parent_id=($2) RETURNING*;', [body.child_id, parent_id]);
        return res.rows;
    }
};
export const updateTask = async (body, task_id) => {
    const res = await pool.query('UPDATE tasks SET subject=($1), topic=($2), description=($3), due=($4), priority=($5), completed=($6) WHERE task_id=($7) RETURNING*;', [body.subject, body.topic, body.description, body.due, body.priority, body.completed, task_id]);
    return res.rows;
};
export const completeTask = async (task_id) => {
    const res = await pool.query('UPDATE tasks SET completed = NOT completed WHERE task_id=($1) RETURNING*;', [task_id]);
    return res.rows;
};
export const deleteTask = async (taskId) => {
    const res = await pool.query('DELETE FROM tasks WHERE task_id = ($1);', [taskId]);
    return res.rows;
};
export const shadowDeleteTask = async (taskId, deleted) => {
    console.log(deleted);
    const res = await pool.query('UPDATE tasks SET deleted=($1) WHERE task_id=($2) RETURNING*;', [deleted, taskId]);
    return res.rows;
};
export const deleteStudent = async (studentId) => {
    const res = await pool.query('DELETE FROM student WHERE student_id = ($1);', [studentId]);
    return res.rows;
};
export const deleteParent = async (parentId) => {
    const res = await pool.query('DELETE FROM parent WHERE parent_id = ($1);', [parentId]);
    return res.rows;
};
