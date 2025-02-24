import express from 'express';
import { addPrecioEspecial, getPreciosEspeciales, deletePrecioEspecial, updatePrecioEspecial, getPrecioEspecialId } from '../controllers/preciosEspecialesController';


const router = express.Router();



router.get('/', async (_req, res) => {
    try {
      const preciosEspeciales = await getPreciosEspeciales();
      res.status(200).json(preciosEspeciales);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error desconocido al obtener los precios especiales." });
      }
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const precioEspecial = await getPrecioEspecialId(id);
      res.status(200).json(precioEspecial);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "El ID del precio especial es requerido." || error.message === "El ID proporcionado no es válido.") {
          res.status(400).json({ message: error.message });
        } else if (error.message === "Precio especial no encontrado.") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Error desconocido al obtener el precio especial." });
      }
    }
  });

// Agregar un nuevo precio especial
router.post('/', async (req, res) => {
    try {
      const { userId, productId, specialPrice } = req.body;
  
      // Validar que los campos obligatorios estén presentes
      if (!userId || !productId || !specialPrice) {
        return res.status(400).json({ message: "userId, productId y specialPrice son obligatorios." });
      }
      
  
      const addedSpecialPrice = await addPrecioEspecial(req.body);
      res.status(201).json({
        message: "Precio especial agregado y usuario actualizado.",
        specialPrice: addedSpecialPrice,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error desconocido al agregar el precio especial." });
      }
    }
  });

router.delete('/', async (req, res) => {
    try {   
        const { userId, precioEspecialId } = req.body
        if (!userId || !precioEspecialId) {
            throw new Error("userId y precioEspecialId son obligatorios.");
        }

        const deletedSpecialPrice = await deletePrecioEspecial(userId, precioEspecialId);
        res.status(200).json({
        message: "Precio especial eliminado y usuario actualizado",
        specialPrice: deletedSpecialPrice
    });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Error desconocido" });    
    }
});

router.put('/', async (req, res) => {
    try {
        const { userId, precioEspecialId, newPrice } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!userId || !precioEspecialId || !newPrice) {
            throw new Error("userId, precioEspecialId y newPrice son obligatorios.");
        }

        // Llamar a la función updatePrecioEspecial
        const updatedSpecialPrice = await updatePrecioEspecial(userId, precioEspecialId, newPrice);
        
        if (updatedSpecialPrice) {

            res.status(200).json({
                message: "Precio especial actualizado correctamente.",
                specialPrice: updatedSpecialPrice
            });
        }
        // Responder con el resultado
      
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Error desconocido" });
    }
});




export default router;