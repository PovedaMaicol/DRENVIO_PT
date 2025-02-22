import express, {Request, Response} from 'express';
import { Product } from '../models/product';
import { ProductEntry, Category } from '../types';
import { addProduct, getProducts } from '../controllers/productControllers';


const router = express.Router();

// Add product
router.post('/', async (req, res) => {
    const { name, description, price, category } = req.body;

     // Validar que los campos obligatorios estén presentes
     if (!name || !price || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Validar que la categoría sea válida
    const validCategories: Category[] = ["Electronics", "Phones", "Accessories"];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
    }

    try {
        const productData: ProductEntry = ({ 
            name, 
            description, 
            price, 
            category
        });

        const product = await addProduct(productData);
;
        res.status(201).json(product);
    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
})

router.get('/', async (_req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Add product



export default router;