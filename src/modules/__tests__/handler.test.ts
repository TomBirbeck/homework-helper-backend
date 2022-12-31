import { createNewStudent, deleteStudent, getAllStudents, getStudentByEmail, getStudentById, updateStudent } from "../handlers"
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

test('create student',async () => {
    const createStudentFunction = jest.fn(createNewStudent)
    const actual = await createStudentFunction("John", "Test", "test@email.com")
    const expected = expect.arrayContaining([expect.objectContaining({
        student_id: expect.any(Number),
        firstname: "John",
        surname: "Test",
        email: "test@email.com",
        student_code: expect.any(String)
    })])
    expect(expected).toMatchObject(actual)
})

test('delete student',async () => {
    const deleteStudentFunction = jest.fn(deleteStudent)
    const actual = await deleteStudentFunction(6)
    const expected: Array<''> = []
    expect(expected).toMatchObject(actual)
})