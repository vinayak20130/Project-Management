import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
const app = express();
import { PORT } from './secrets';
import authRouter from './routes/auth.route';

dotenv.config();

//middlewares
app.use(express.json());

app.use('/api/v1/user', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Working');
});
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
