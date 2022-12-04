import express from "express";
const router = express.Router()

router.get('/home', async (req, res, next) =>{
    res.json({message: "welcome to the home page"})
    next()
})

// router.post('/signup', async (req, res,next) =>{
    
// })

router.get('/student', async (req, res,next) =>{
    
})

router.get('/parent', async (req, res, next) =>{
    
})

router.post('/student', async (req, res, next) =>{

})

router.patch('/student/:id', async (req, res, next) =>{

})

router.delete('/student/:id', async (req, res, next) =>{

})

export default router