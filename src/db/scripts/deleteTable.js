import pool from '../index.js';

async function deleteTable(tableName) {
  await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
  console.log(`table ${tableName} deleted`);
}

//PUT TABLE NAME OF THE TABLE YOU WANT TO DELETE AS ARGUMENT TO THE FUNCTION BELOW

deleteTable('student');