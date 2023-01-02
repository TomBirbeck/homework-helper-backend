import request from 'supertest';
import app from '../index'


describe('student routes', () => {
    test('create student', async () => {

        const res = await request(app).post('/student').send({firstname: "Testing", surname: "Routes", email: "routes@testing.com"})
        
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