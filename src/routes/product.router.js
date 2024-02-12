import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const router = Router();

// Endpoint GET para obtener productos paginados
router.get('/', ProductController);

// Endpoint GET para obtener un producto por _id
router.get('/:_id', ProductController);

// Endpoint POST para crear un nuevo producto
router.post('/', ProductController);

// Endpoint PUT para actualizar un producto por _id
router.put('/:id', ProductController);

// Exportar el router
export default router;
