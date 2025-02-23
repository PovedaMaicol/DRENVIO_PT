import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import specialPricesRouter from './routes/specialPrices';
import productsRouter from './routes/products';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Rutas
app.use('/api/special-prices', specialPricesRouter);
app.use('/api/productos', productsRouter);
app.use('/api/usuarios', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});