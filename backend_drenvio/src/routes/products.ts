// Importar express
import express from 'express';
import {  getProducts } from '../controllers/productControllers';


const router = express.Router();

router.get('/', getProducts);
// Add product



export default router;