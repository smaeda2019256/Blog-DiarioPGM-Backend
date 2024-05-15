import { Router } from "express";
import { updateUser, deleteUser, getUser } from "./user.controller.js";


const router = Router();

// Actualizar usuario
router.put("/:id", updateUser);

// Borrar usuario
router.delete("/:id", deleteUser);

// Obtener usuario
router.get("/:id", getUser);

export default router;
