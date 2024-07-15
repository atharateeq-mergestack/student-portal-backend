import express from 'express';
import bodyParser from 'body-parser';
import { API_PREFIX } from '@utils/constants';
import userRoutes from '@routes/userRoutes';
import { connectToDatabase } from '@db/connection';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.json());

app.use(`${API_PREFIX}/user`, userRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
