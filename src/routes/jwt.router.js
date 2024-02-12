import { Router } from "express";
import JwtController from "../controllers/JwtController.js";

const router = Router();

// Endpoint POST para iniciar sesión
router.use("/auth", JwtController);

// Exportar el router
export default router;
