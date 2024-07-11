import express from 'express';
import bodyParser from 'body-parser';
import { API_PREFIX } from '@utils/constants';
import userRoutes from '@routes/userRoutes';
import { connectToDatabase } from '@db/connection';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(`${API_PREFIX}/user`, userRoutes);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
