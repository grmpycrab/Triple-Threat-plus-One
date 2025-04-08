import express from 'express';
import { admin, protect } from '../middleware/authMiddleware';
import { getLoginLogs, getUserLoginHistory } from '../services/logService';

const router = express.Router();

// Get all login logs (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const logs = await getLoginLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

// Get a user's login history (admin or the user themselves)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    // Check if the user is an admin or requesting their own logs
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Not authorized to view these logs' });
    }
    
    const loginHistory = await getUserLoginHistory(req.params.userId);
    res.json(loginHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user login history' });
  }
});

export default router; 