import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/');

app.listen(PORT, async () => console.log(`app listening on port ${PORT}`));

export default app;