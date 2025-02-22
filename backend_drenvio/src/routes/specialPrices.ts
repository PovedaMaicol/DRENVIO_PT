import express from 'express';

import { SpecialPriceEntry } from '../types';
import { addPrecioEspecial } from '../controllers/preciosEspecialesController';

const router = express.Router();

//Add special price
router.post('/', async (req, res) => {
    const { userId, productId, price, startDate, endDate, status } = req.body;

    try {
        const specialPriceData: SpecialPriceEntry = ({ 
            userId, 
            productId, 
            price, 
            startDate, 
            endDate, 
            status,
     
        });

        const specialPrice = await addPrecioEspecial(specialPriceData);

        res.status(201).json(specialPrice);
    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});



export default router;