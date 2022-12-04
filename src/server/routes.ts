import express from "express";
import { createNewParent, createNewStudent, createNewTask, test } from "../modules/handlers.js";
const router = express.Router()

router.get('/', async (req, res, next) =>{
    try {
        res.json({message: "welcome to the home page"})
    } catch (error) {
        res.status(404)
        res.json({message: "Error 404 page not found"})
    }
    next()
})

router.get('/test',async (req, res, next) => {
    try {
        const payload = await test()
        console.log(payload)
        res.send({message: "here is your test data", payload: payload})
    } catch (error) {
        res.status(400)
        res.json({message:"test route not working"})
    }
    next()
    
})

router.post('/signup', async (req, res,next) => {
    
})

router.get('/student', async (req, res,next) =>{
    
})

router.get('/parent', async (req, res, next) =>{
    
})

router.post('/student', async (req, res, next) =>{
    try { 
        const {firstname, surname, email, password} = req.body
        const payload = await createNewStudent(firstname, surname, email, password)
        res.json({message: "new user created", payload: payload})
    } catch (error) {
        res.status(404)
        res.json({message: "error in creating student"})
    }
    next()
})
router.post('/parent', async (req, res, next) =>{
    try { 
        const {firstname, surname, email, password, child_id} = req.body
        const payload = await createNewParent(firstname, surname, email, password, child_id)
        res.json({message: "new parent created", payload: payload})
    } catch (error) {
        res.status(404)
        res.json({message: "error in creating parent"})
    }
    next()
})
router.post('/tasks', async (req, res, next) =>{
    try { 
        const {subject, topic, description, due, completed} = req.body
        const payload = await createNewTask(subject, topic, description, due, completed)
        res.json({message: "new task created", payload: payload})
    } catch (error) {
        res.status(404)
        res.json({message: "error in creating task"})
    }
    next()
})

router.patch('/student/:id', async (req, res, next) =>{

})

router.delete('/student/:id', async (req, res, next) =>{

})

export default router