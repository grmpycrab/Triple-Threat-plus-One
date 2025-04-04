import express from 'express';
import { getCurrentUser, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router; 