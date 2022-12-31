import { getAllStudents, getStudentByEmail, getStudentById } from "../handlers"
// import pool from '../../db/index'

// beforeEach(() => {
//     return pool.connect();
//   });
  
//   afterEach(() => {
//     return pool.end();
//   });    

describe('testing student handlers', ()=>{
    test('get students',async () => {
        const allStudentsFunction = jest.fn(getAllStudents)
        const actual = await allStudentsFunction()
        const expected = expect.arrayContaining([ expect.objectContaining({
            student_id: expect.any(Number),
            firstname: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            student_code: expect.any(String)
        })])
        expect(expected).toMatchObject(actual)
    })

})
test('get student by email',async () => {
    const getStudentByEmailFunction = jest.fn(getStudentByEmail)
    const actual = await getStudentByEmailFunction("demo@email.com")
    const expected = expect.arrayContaining([expect.objectContaining({
        student_id: expect.any(Number),
        firstname: expect.any(String),
        surname: expect.any(String),
        email: "demo@email.com",
        student_code: expect.any(String)
    })])
    expect(expected).toMatchObject(actual)
})