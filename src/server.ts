import express from 'express';
import bodyParser from 'body-parser';
import "module-alias/register";

import { API_PREFIX } from './utils/constants';
import userRoutes from '@routes/userRoutes';
import { connectToDatabase } from '@db/connection';
import authRoutes from '@routes/authRoutes';
import cors from 'cors';
import subjectRoutes from '@routes/subjectRoutes';
import resultRoutes from '@routes/resultRoutes';
import categoryRoutes from '@routes/categoryRoutes';
import productRoutes from '@routes/productRoutes';
import cartRoutes from '@routes/cartRoutes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.json());

app.use(`${API_PREFIX}/user`, userRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/subject`, subjectRoutes);
app.use(`${API_PREFIX}/result`, resultRoutes);
app.use(`${API_PREFIX}/category`, categoryRoutes);
app.use(`${API_PREFIX}/product`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`/`, (req, res) => {
  res.send('Welcome to the API');
})

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

export default app;