import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';

const port = 4201; // partner api

const app: Application = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/', router); 

app.listen(port, () => {
  console.log('Server Started! Running on:', port);
});


