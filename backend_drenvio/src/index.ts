import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import specialPricesRouter from './routes/specialPrices';
import productsRouter from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Rutas
app.use('/api/special-prices', specialPricesRouter);
app.use('/api/products', productsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});