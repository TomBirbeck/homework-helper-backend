import pool from '../db/index.js'

export const test = async () => {
    const res = await pool.query(`SELECT * FROM student;`)
    return res.rows
    }

export const createNewStudent = async (firstname:String, surname:String, email:String, password:String) =>{
    const code = `${firstname}` + `${surname}`
const res = await pool.query('INSERT INTO student (firstname, surname, email, password, code) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [firstname, surname, email, password, code])
return res.rows
}

export const createNewParent = async (firstname:String, surname:String, email:String, password:String, childId:String) =>{
    const res = await pool.query('INSERT INTO student (firstname, surname, email, password, child_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [firstname, surname, email, password, childId])
    return res.rows
}
export const createNewTask = async (subject:String, topic:String, description:String, due:String, completed:Boolean,) =>{
    const res = await pool.query('INSERT INTO tasks (subject, topic, description, due, completed) VALUES ($1,$2,$3,$4,$5) RETURNING*;', [subject, topic, description, due, completed])
    return res.rows
}
export const getTasksForStudent = (studentId:Number) => {
}
export const updateStudent = (studentId:Number, body: {}) =>{
}
export const updateParent = (parentId:Number, body: {}) =>{
}
export const updateTask = (taskId:Number, body: {}) => {
}
export const deleteTask = (taskId:Number) => {
}