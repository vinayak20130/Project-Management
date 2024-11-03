import express from 'express';
import { Request, Response } from 'express';
const app = express();
import { PORT } from './secrets';
app.get('/', (req: Request, res: Response) => {
  res.send('Working');
});
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
