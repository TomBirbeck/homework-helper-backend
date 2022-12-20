import express from 'express';
import useRouter from './routes.js'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3001;
// const PORT = 3001

app.use(cors())
app.use(express.json());

app.use('/', useRouter);
// app.use('/', (req, res, next) => {
//     res.json({ message: 'hello' });
//     next()
// });

// app.use('/homework', useRouter);

app.listen(PORT, async () => console.log(`app listening on port ${PORT}`));

export default app;