import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import authRouter from './routes/auth.routes';

const app = express();

app.use(cors()).use(express.json());

app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
