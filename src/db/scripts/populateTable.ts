import pool from '../index'
import {tasks, students} from "../dummyData";

// interface studentIProps {
//         firstname: String,
//         surname: String,
//         email: String,
//         password: String,
//         code: String
// }

// interface studentArrayProps {
//     students: studentIProps[]
//     length: Number
// }

async function populateStudents(students:any) {
    for (let i = 0; i < students.length; i++) {
      let res = await pool.query(
        'insert into allergy (firstname,surname,email,password,code) values ($1,$2,$3,$4,$5) returning *',
        [students[i].firstname, students[i].surname, students[i].email, students[i].password, students[i].code]
      );
      console.log(res.rows);
    }
  }
  
  populateStudents(students);

async function populateTasks(tasks:any) {
    for (let i = 0; i < tasks.length; i++) {
      let res = await pool.query(
        'insert into allergy (firstname,surname,email,password,code) values ($1,$2,$3,$4,$5,$6) returning *',
        [tasks[i].subject, tasks[i].topic, tasks[i].description, tasks[i].due, tasks[i].completed, tasks[i].student]
      );
      console.log(res.rows);
    }
  }
  
  populateTasks(tasks);