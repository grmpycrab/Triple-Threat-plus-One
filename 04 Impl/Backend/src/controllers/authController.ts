import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    // Check for admin credentials
    if (username === 'admin' && password === '12345') {
      // Find or create admin user
      let adminUser = await User.findOne({ username: 'admin' });
      
      if (!adminUser) {
        // Create admin user if it doesn't exist
        // Do not hash the password here, the pre-save hook will handle it
        adminUser = await User.create({
          username: 'admin',
          email: 'admin@example.com',
          password: '12345', // Plain password, will be hashed by the pre-save hook
          role: 'admin',
          userId: 'ADMIN-001'
        });
      }

      const token = generateToken(adminUser._id);
      
      return res.status(200).json({
        _id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        userId: adminUser.userId,
        token
      });
    }

    // Find user by username - trim the username to handle spaces
    const trimmedUsername = username.trim();
    console.log('Looking for user with trimmed username:', trimmedUsername);
    
    const user = await User.findOne({ username: trimmedUsername });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    console.log('Comparing password with stored hash');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      userId: user.userId,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 