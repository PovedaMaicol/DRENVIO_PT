import express from 'express';
import { getUserId, getUsers } from '../controllers/userControllers';


const router = express.Router();


router.get('/', getUsers);

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUserId(id);
        res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
          if (error.message === "El ID del usuario es requerido." || error.message === "El ID proporcionado no es válido.") {
            res.status(400).json({ message: error.message });
          } else if (error.message === "Usuario no encontrado.") {
            res.status(404).json({ message: error.message });
          } else {
            res.status(500).json({ message: error.message });
          }
        } else {
          res.status(500).json({ message: "Error desconocido al obtener el usuario." });
        }
      }
})



export default router;
