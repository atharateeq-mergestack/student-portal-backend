import express from 'express';
import bodyParser from 'body-parser';
import { API_PREFIX } from '@utils/constants';
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
// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Student Portal Backend!");
});


// Register Routes
app.use(`${API_PREFIX}/user`, userRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/subject`, subjectRoutes);
app.use(`${API_PREFIX}/result`, resultRoutes);
app.use(`${API_PREFIX}/category`, categoryRoutes);
app.use(`${API_PREFIX}/product`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);

// Export the app for Vercel (Serverless)
export default async function handler(req: any, res: any) {
  await connectToDatabase(); // Ensure DB is connected before handling requests
  return app(req, res);
}

// Start the server only in local development
if (process.env.NODE_ENV !== "production") {
  connectToDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  });
}
