import express from 'express';
const router = express.Router();
import { signup, signin, logout, userProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

// Auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);

export default router;
