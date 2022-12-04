import express from "express";
import { createNewParent, createNewStudent, createNewTask, deleteParent, deleteStudent, deleteTask, getAllStudents, test } from "../modules/handlers.js";
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
try {
    const payload = await getAllStudents()
    console.log(res)
    res.json({payload:res})
} catch (error) {
    res.status(404)
    res.json({message:"failed to return request"})
}
next()
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
    try {
        const payload = await deleteStudent(Number(req.params.id))
        res.json({success: true, payload: payload})
        
    } catch (error) {
        res.status(400)
        res.json({message: "failed to delete student"})
    }
    next()

})
router.delete('/parent/:id', async (req, res, next) =>{
    try {
        const payload = await deleteParent(Number(req.params.id))
        res.json({success: true, payload: payload})
    } catch (error) {
        res.status(400)
        res.json({success:false, message: "failed to delete parent"})
    }

})
router.delete('/tasks/:id', async (req, res, next) =>{
    try {
        const payload = await deleteTask(Number(req.params.id))
        res.json({success: true, payload: payload})
    } catch (error) {
        res.status(400)
        res.json({success: false, message: "failed to delete task"})
    }
})

export default router