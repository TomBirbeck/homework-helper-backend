import { completeTask, createNewParent, createNewStudent, createNewTask, deleteParent, deleteStudent, deleteTask, getAllStudents, getParentByEmail, getParentById, getStudentByEmail, getStudentById, getStudentTasksForParent, getTasksForStudent, updateStudent } from "../handlers"
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

})


describe('testing parent handlers', ()=>{
   
 test('create parent',async () => {
        const createParentFunction = jest.fn(createNewParent)
        const actual = await createParentFunction("John", "Test", "parenttest@email.com", "68efc6c6-926b-4cd5-bbe2-e05b76f66ebb")
        const expected = expect.arrayContaining([expect.objectContaining({
            parent_id: expect.any(Number),
            firstname: "John",
            surname: "Test",
            email: "parenttest@email.com",
            child_id: "68efc6c6-926b-4cd5-bbe2-e05b76f66ebb"
        })])
        expect(expected).toMatchObject(actual)
    })

test('get parent by email',async () => {
    const getParentByEmailFunction = jest.fn(getParentByEmail)
    const actual = await getParentByEmailFunction("parenttest@email.com")
    const expected = expect.arrayContaining([expect.objectContaining({
        parent_id: expect.any(Number),
        firstname: expect.any(String),
        surname: expect.any(String),
        email: "parenttest@email.com",
        child_id: expect.any(String)
    })])
    expect(expected).toMatchObject(actual)
})

test('get parent by id',async () => {
    const getParentByIdFunction = jest.fn(getParentById)
    const actual = await getParentByIdFunction(5)
    const expected = expect.arrayContaining([expect.objectContaining({
        parent_id: 5,
        firstname: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
        child_id: expect.any(String)
    })])
    expect(expected).toMatchObject(actual)
})


test('delete parent',async () => {
    const deleteParentFunction = jest.fn(deleteParent)
    const actual = await deleteParentFunction(10)
    const expected: Array<''> = []
    expect(expected).toMatchObject(actual)
})

})

describe('tests for tasks', () => {
    test('create task', async () => {
        const actual = await createNewTask("Maths", "Algebra", "", "20/07/2023", false, '68efc6c6-926b-4cd5-bbe2-e05b76f66ebb')
        const expected = [{
            task_id: expect.any(Number),
            subject: "Maths",
            topic: "Algebra",
            description: "",
            due: "20/07/2023",
            completed: false,
            creator_id: '68efc6c6-926b-4cd5-bbe2-e05b76f66ebb'
        }]
        expect(expected).toStrictEqual(actual)
    })

     test('get tasks for student', async () => {
        const actual = await getTasksForStudent('68efc6c6-926b-4cd5-bbe2-e05b76f66ebb')
        const expected = expect.arrayContaining([{
            task_id: expect.any(Number),
            subject: expect.any(String),
            topic: expect.any(String),
            description: expect.any(String),
            due: expect.any(String),
            completed: expect.any(Boolean),
            creator_id: '68efc6c6-926b-4cd5-bbe2-e05b76f66ebb'
        }])
        expect(expected).toStrictEqual(actual)
    })
     test('get tasks for parent', async () => {
        const actual = await getStudentTasksForParent('68efc6c6-926b-4cd5-bbe2-e05b76f66ebb')
        const expected = expect.arrayContaining([{
            task_id: expect.any(Number),
            subject: expect.any(String),
            topic: expect.any(String),
            description: expect.any(String),
            due: expect.any(String),
            completed: expect.any(Boolean),
            creator_id: '68efc6c6-926b-4cd5-bbe2-e05b76f66ebb'
        }])
        expect(expected).toStrictEqual(actual)
    })
     test('complete task (will actually toggle between)', async () => {
        const actual = await completeTask(13)
        const expected = [{
            task_id: 13,
            subject: expect.any(String),
            topic: expect.any(String),
            description: expect.any(String),
            due: expect.any(String),
            completed: true,
            creator_id: expect.any(String)
        }]
        expect(expected).toStrictEqual(actual)
    })

    test('delete task', async () => {
        const actual = await deleteTask(12)
        const expected: Array<''> = []
        expect(expected).toStrictEqual(actual)
    })

})