import request from 'supertest';
import app from '../index'


describe('student routes', () => {

test('create student', async () => {

          const res = await request(app).post('/student').send({firstname: "Testing", surname: "Routes", email: "routes@testing.com"})
          
          const expectedBody = {
                  success: true,
                    message: "new user created",
                  payload: expect.arrayContaining([expect.objectContaining({
           student_id: expect.any(Number),
           firstname: "Tested",
           surname: "Routes",
           email: "routes@testing.com",
           student_code: expect.any(String)
                  })])
              }
  
              expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toStrictEqual(expectedBody);
              })

test('create student', async () => {
          const res = await request(app).patch('/student12').send({firstname: "Tested"})
          
          const expectedBody = {
                  success: true,
                  payload: expect.arrayContaining([expect.objectContaining({
           student_id: expect.any(Number),
           firstname: "Testing",
           surname: "Routes",
           email: "routes@testing.com",
           student_code: expect.any(String)
                  })])
              }
  
              expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toStrictEqual(expectedBody);
              })

    test('get student by id', async () => {
        await request(app).get('/student/1', (req, res) => {
            const expectedBody = {
                success: true,
                payload: expect.arrayContaining([expect.objectContaining({
         student_id: 1,
         firstname: expect.any(String),
         surname: expect.any(String),
         email: expect.any(String),
         student_code: expect.any(String)
                })])
            }
            expect(res.statusCode).toBe(200);
          expect(res.headers['content-type']).toMatch(/json/);
          expect(res.body).toStrictEqual(expectedBody);
            })
    })

       test('delete student', async () => {

        const res = await request(app).delete('/student/12')
        
        const expectedBody = {
            success: true,
            payload: []
        }

            expect(res.statusCode).toBe(200);
          expect(res.headers['content-type']).toMatch(/json/);
          expect(res.body).toStrictEqual(expectedBody);
            })

})

describe('parent routes', () => {

    test('create parent', async () => {

        const res = await request(app).post('/parent').send({firstname: "Testing", surname: "Parent", email: "routes@testingstuff.com", child_id: "68efc6c6-926b-4cd5-bbe2-e05b76f66ebb"})
        
        const expectedBody = {
                success: true,
                message: "new parent created",
                payload: expect.arrayContaining([expect.objectContaining({
         parent_id: expect.any(Number),
         firstname: "Testing",
         surname: "Parent",
         email: "routes@testingstuff.com",
         child_id: "68efc6c6-926b-4cd5-bbe2-e05b76f66ebb"
                })])
            }

            expect(res.statusCode).toBe(200);
          expect(res.headers['content-type']).toMatch(/json/);
          expect(res.body).toStrictEqual(expectedBody);
            })

    test('get parent by id', async () => {
        await request(app).get('/parent/1', (req, res) => {
            const expectedBody = {
                success: true,
                payload: expect.arrayContaining([expect.objectContaining({
         parent_id: 1,
         firstname: expect.any(String),
         surname: expect.any(String),
         email: expect.any(String),
         child_id: expect.any(String)
                })])
            }
            expect(res.statusCode).toBe(200);
          expect(res.headers['content-type']).toMatch(/json/);
          expect(res.body).toStrictEqual(expectedBody);
            })
    })

    test('patch parent', async () => {

          const res = await request(app).patch('/parent/7').send({firstname: "Tested"})
          
          const expectedBody = {
                  success: true,
                  payload: expect.arrayContaining([expect.objectContaining({
           parent_id: expect.any(Number),
           firstname: "Tested",
           surname: "Parent",
           email: "routes@testingstuff.com",
           child_id: "68efc6c6-926b-4cd5-bbe2-e05b76f66ebb"
                  })])
              }
  
              expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toStrictEqual(expectedBody);
              })

       test('delete parent', async () => {

        const res = await request(app).delete('/parent/12')
        
        const expectedBody = {
            success: true,
            payload: []
        }

            expect(res.statusCode).toBe(200);
          expect(res.headers['content-type']).toMatch(/json/);
          expect(res.body).toStrictEqual(expectedBody);
            })

})

describe('task related routes', () => {
  test('create new task', async () => {
    const res = await request(app).post('/tasks/23f7872d-c4d5-4973-a8e9-26af69edfd8f').send({
      subject: 'History',
      topic: 'Henry VIII',
      description: "research effect on the church",
      due: "10/01/2023",
      completed: false
    })
  
  const expectedBody = {
    success: true,
    message: 'new task created',
    payload: expect.arrayContaining([expect.objectContaining({
    task_id: expect.any(Number),
    subject: 'History',
      topic: 'Henry VIII',
      description: "research effect on the church",
      due: "10/01/2023",
      completed: false
  })])}
  
  expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
  expect(res.body).toStrictEqual(expectedBody);
  })

  test('get tasks for student', async () => {
    const res = await request(app).get('/studenttasks?code=23f7872d-c4d5-4973-a8e9-26af69edfd8f')
    const expectedBody = {
      success: true,
      payload: expect.arrayContaining([expect.objectContaining({
        task_id: expect.any(Number),
        subject: expect.any(String),
        topic: expect.any(String),
        description: expect.any(String),
        due: expect.any(String),
        completed: expect.any(Boolean),
        creator_id: '23f7872d-c4d5-4973-a8e9-26af69edfd8f'
      })])
    }
    expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
  expect(res.body).toStrictEqual(expectedBody);
    
  })

  test('patch task', async () => {
    const res = await request(app).patch('/tasks/6').send({
      task_id: 6,
      subject: "Tom",
      topic: "Ginger",
      description: "will he have white hair?",
      due: "2022-12-22",
      completed: true,
      creator_id: "23f7872d-c4d5-4973-a8e9-26af69edfd8f"

    })
    const expectedBody = {
      success: true,
      payload: expect.arrayContaining([expect.objectContaining(
    {
      "task_id": 6,
      "subject": "Tom",
      "topic": "Ginger",
      "description": "will he have white hair?",
      "due": "2022-12-22",
      "completed": true,
      "creator_id": "23f7872d-c4d5-4973-a8e9-26af69edfd8f"
    },
      )])
    }
    expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
  expect(res.body).toStrictEqual(expectedBody);
    
  })

  test('patch to toggle completed', async () => {
    const res = await request(app).patch('/tasks/completed/6')
    const expectedBody = {
      success: true,
      payload: expect.arrayContaining([expect.objectContaining(
    {
      "task_id": 6,
      "subject": "Tom",
      "topic": "Ginger",
      "description": "will he have white hair?",
      "due": "2022-12-22",
      "completed": false,
      "creator_id": "23f7872d-c4d5-4973-a8e9-26af69edfd8f"
    },
      )])
    }
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toStrictEqual(expectedBody);
  })

  test('delete task', async () => {

            const res = await request(app).delete('/tasks/2')
            
            const expectedBody = {
                success: true,
                payload: []
            }
    
                expect(res.statusCode).toBe(200);
              expect(res.headers['content-type']).toMatch(/json/);
              expect(res.body).toStrictEqual(expectedBody);
                })


})