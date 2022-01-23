import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/subscribe', subscribeRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/api', (req, res) => {
    res.send('Api is running...');
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(`server running in ${env} mode on port ${PORT}`)
);
