import express from "express";
import { completeTask, createNewParent, createNewStudent, createNewTask, deleteParent, deleteStudent, deleteTask, getParentByEmail, getParentById, getStudentByEmail, getStudentById, getTasksForStudent, shadowDeleteTask, updateParent, updateStudent, updateTask } from "../modules/handlers.js";
const router = express.Router();
router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "welcome to the home page" });
    }
    catch (error) {
        res.status(404);
        res.json({ message: "Error 404 page not found" });
    }
    next();
});
router.get('/test', async (req, res, next) => {
    try {
        if (req.query.code) {
            const payload = await getTasksForStudent(String(req.query.code));
            res.json({ success: true, payload: payload });
        }
    }
    catch (error) {
        res.status(400);
        res.json({ message: "test route not working", error: error });
    }
    next();
});
router.post('/signup', async (req, res, next) => {
});
router.get('/student/:id', async (req, res, next) => {
    try {
        const payload = await getStudentById(Number(req.params.id));
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(300);
        res.json({ success: false, message: "failed to return request" });
    }
    next();
});
router.get('/student', async (req, res, next) => {
    try {
        if (req.query.email) {
            const payload = await getStudentByEmail(String(req.query.email));
            res.json({ success: true, payload: payload });
        }
    }
    catch (error) {
        res.status(404);
        res.json({ success: false, message: "student not found" });
    }
    next();
});
// router.get('/student/tasks/:id', async (req, res, next) => {
//     try {
//         const payload = await getTasksForStudent(req.params.id)
//         res.json({success: true, payload: payload})
//     } catch (error) {
//         res.status(300)
//         res.json({success: false, message: "request failed"})
//     }
//     next()
// })
router.get('/studenttasks', async (req, res, next) => {
    try {
        if (req.query.code) {
            const payload = await getTasksForStudent(String(req.query.code));
            res.json({ success: true, payload: payload });
        }
    }
    catch (error) {
        res.status(404);
        res.json({ success: false, message: "request for tasks failed" });
    }
    next();
});
// router.get('/student/tasks', async (req, res, next) => {
//     try {
//             const {code}  = req.body
//             const payload = await getTasksForStudent(code)
//             res.json({success: true, payload: payload})
//     } catch (error) {
//         res.status(300)
//         res.json({success: false, message: "request failed"})
//     }
//     next()
// })
router.get('/parent/:id', async (req, res, next) => {
    try {
        const payload = await getParentById(Number(req.params.id));
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(404);
        res.json({ success: false, message: "parent not found" });
    }
    next();
});
router.get('/parent', async (req, res, next) => {
    try {
        if (req.query.email) {
            const payload = await getParentByEmail(String(req.query.email));
            res.json({ success: true, payload: payload });
        }
    }
    catch (error) {
        res.status(404);
        res.json({ success: false, message: "parent not found" });
    }
    next();
});
router.post('/student', async (req, res, next) => {
    try {
        const { firstname, surname, email } = req.body;
        const payload = await createNewStudent(firstname, surname, email);
        res.json({ success: true, message: "new user created", payload: payload });
    }
    catch (error) {
        res.status(404);
        res.json({ message: "error in creating student" });
    }
    next();
});
router.post('/parent', async (req, res, next) => {
    try {
        const { firstname, surname, email, child_id } = req.body;
        const payload = await createNewParent(firstname, surname, email, child_id);
        res.json({ success: true, message: "new parent created", payload: payload });
    }
    catch (error) {
        res.status(404);
        res.json({ message: "error in creating parent" });
    }
    next();
});
router.post('/tasks/:id', async (req, res, next) => {
    try {
        const { subject, topic, description, due, priority, completed } = req.body;
        const creatorId = (req.params.id);
        const payload = await createNewTask(subject, topic, description, due, priority, completed, creatorId);
        res.json({ success: true, message: "new task created", payload: payload });
    }
    catch (error) {
        res.status(404);
        res.json({ success: false, message: 'error creating task' });
    }
    next();
});
router.patch('/student/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        // const {firstname, surname, email, password} = req.body
        // const body = [{firstname: firstname},{surname: surname}, {email:email}, {password:password} ]
        const payload = await updateStudent(req.body, id);
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(300);
        res.json({ success: false, message: "error occurred when trying to update student", error: error });
    }
    next();
});
router.patch('/parent/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const payload = await updateParent(req.body, id);
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(300);
        res.json({ success: false, message: "error occurred when trying to update parent", error: error });
    }
    next();
});
router.patch('/tasks/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const payload = await updateTask(req.body, id);
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(300);
        res.json({ success: false, message: "error occurred when trying to update task", error: error });
    }
    next();
});
router.patch('/tasks/completed/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const payload = await completeTask(id);
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(300);
        res.json({ success: false, message: "error occurred when trying to update task completion", error: error });
    }
    next();
});
router.delete('/student/:id', async (req, res, next) => {
    try {
        const payload = await deleteStudent(Number(req.params.id));
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(400);
        res.json({ message: "failed to delete student" });
    }
    next();
});
router.delete('/parent/:id', async (req, res, next) => {
    try {
        const payload = await deleteParent(Number(req.params.id));
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(400);
        res.json({ success: false, message: "failed to delete parent" });
    }
    next();
});
router.delete('/tasks/:id', async (req, res, next) => {
    try {
        const payload = await deleteTask(Number(req.params.id));
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(400);
        res.json({ success: false, message: "failed to delete task" });
    }
    next();
});
router.patch('/tasksshadowdelete', async (req, res, next) => {
    try {
        const payload = await shadowDeleteTask(Number(req.body.id), req.body.deleted);
        res.json({ success: true, payload: payload });
    }
    catch (error) {
        res.status(400);
        res.json({ success: false, message: "failed to deleted task" });
    }
    next();
});
export default router;
