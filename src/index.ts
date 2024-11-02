import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req : Request ,res : Response) => {
    res.send ("Working");
})
app.listen(port,() => {console.log(`app is running on port ${port}`)})
