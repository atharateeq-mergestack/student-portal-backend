import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { API_PREFIX } from './utils/constants';
import userRoutes from './routes/userRoutes';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(`${API_PREFIX}/user`, userRoutes);

mongoose.connect(`${process.env.MONGOURI}`)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB: ', error);
});
