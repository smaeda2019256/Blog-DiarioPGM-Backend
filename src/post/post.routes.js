import { Router } from "express";
import { createPost, updatePost, deletePost, getPost, getAllPosts } from "./post.controller.js";


const router = Router();

// Crear publicación
router.post("/", createPost);

// Actualizar publicación
router.put("/:id", updatePost);

// Borrar publicación
router.delete("/:id", deletePost);

// Obtener publicación por ID
router.get("/:id", getPost);

// Obtener todas las publicaciones
router.get("/", getAllPosts);

export default router;
