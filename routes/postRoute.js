import express from 'express';
const router = express.Router();
import { createPost, showPost, showSinglePost, deletePost, updatePost, addComment, addLike, removeLike } from '../controllers/postController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

// Blog routes
router.post('/post/create', isAuthenticated, isAdmin, createPost);
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deletePost);
router.put('/update/post/:id', isAuthenticated, isAdmin, updatePost);
router.put('/comment/post/:id', isAuthenticated, addComment);
router.put('/addlike/post/:id', isAuthenticated, addLike);
router.put('/removelike/post/:id', isAuthenticated, removeLike);

export default router;
