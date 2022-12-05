import pool from '../db/index.js'

export const test = async () => {
    const res = await pool.query(`SELECT * FROM tasks;`)
    return res.rows
    }

export const createNewStudent = async (firstname:String, surname:String, email:String, password:String) =>{
    const code = `${firstname}` + `${surname}`
const res = await pool.query('INSERT INTO student (firstname, surname, email, password, code) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [firstname, surname, email, password, code])
return res.rows
}

export const createNewParent = async (firstname:String, surname:String, email:String, password:String, childId:String) =>{
    const res = await pool.query('INSERT INTO parent (firstname, surname, email, password, child_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [firstname, surname, email, password, childId])
    return res.rows
}
export const createNewTask = async (subject:String, topic:String, description:String, due:String, completed:Boolean, studentId:Number) =>{
    const res = await pool.query('INSERT INTO tasks (subject, topic, description, due, completed, creator_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING*;', [subject, topic, description, due, completed, studentId])
    return res.rows
}

export const getAllStudents = async () => {
    const res = await pool.query(`SELECT * FROM student;`)
    return res.rows
}

export const getTasksForStudent = async (studentId:Number) => {
    const res = await pool.query('SELECT * FROM tasks WHERE creator_id = ($1);', [studentId])
    return res.rows
}

export const getParentById = async (parentId:Number) => {
    const res = await pool.query('SELECT * FROM parent WHERE parent_id = ($1);', [parentId])
    return res.rows
}

export const getStudentTasksForParent = async (creatorId:Number) => {
    const res = await pool.query('SELECT * FROM tasks WHERE creator_id = ($1);', [creatorId])
    return res.rows
}

export const updateStudent = async (body: {firstname: String, surname: String, email:string, password: String}, student_id: Number) =>{
    // console.log(student_id)
    // const bodies = [{firstname: body.firstname}, {surname: body.surname}, {email: body.email}, {password:body.password}]
    // console.log(bodies)
    // for (let i = 0; i < bodies.length; i++) {
    //     console.log(bodies[i])
    //     if (bodies[i] === null ){
    //         const res = await pool.query(`UPDATE student SET ${bodies[i]}=($1), WHERE student_id=($2) RETURNING*;`,[bodies[i], student_id])
    //         return res.rows
    //     }
    // }
    const res = await pool.query('UPDATE student SET firstname=($1), surname=($2), email=($3), password=($4) WHERE student_id=($5) RETURNING*;',[body.firstname, body.surname, body.email, body.password, student_id])
    return res.rows
}
export const updateParent = async (body: {firstname: String, surname: String, email:string, password: String, child_id:Number}, parent_id:Number) =>{
    const res = await pool.query('UPDATE parent SET firstname=($1) surname=($2) email=($3) password=($4) child_id=($5) WHERE parent_id=($6) RETURNING*;',[body.firstname, body.surname, body.email, body.password, body.child_id, parent_id])
    return res.rows
}
export const updateTask = async (body: {subject: String, topic: String, description: String, due: String, completed: Boolean}, task_id: Number) => {
    const res = await pool.query('UPDATE tasks SET subject=($1), topic=($2), description=($3), due=($4), completed=($5) WHERE task_id=($6) RETURNING*;', [body.subject, body.topic, body.description, body.due, body.completed, task_id])
    return res.rows
}
export const completeTask = async (task_id: Number) => {
    const res = await pool.query('UPDATE tasks SET completed = NOT completed WHERE task_id=($1) RETURNING*;', [task_id])
    return res.rows
}
export const deleteTask = async (taskId:Number) => {
    const res = await pool.query('DELETE FROM tasks WHERE task_id = ($1);',[taskId])
    return res.rows
}
export const deleteStudent = async (studentId:Number) => {
    const res = await pool.query('DELETE FROM student WHERE student_id = ($1);',[studentId])
    return res.rows
}
export const deleteParent = async (parentId:Number) => {
    const res = await pool.query('DELETE FROM parent WHERE parent_id = ($1);',[parentId])
    return res.rows
}