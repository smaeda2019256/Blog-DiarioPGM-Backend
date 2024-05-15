import { Router } from "express";
import { register, login } from "./auth.controller.js";

const router = Router();

// Registro
router.post("/register", register);

// Inicio de sesión
router.post("/login", login);

export default router;
