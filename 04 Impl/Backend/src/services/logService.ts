import { Request } from 'express';
import Log from '../models/Log';
import User from '../models/User';

// Helper function to format time in 12-hour format
const formatTime12Hour = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const createLoginLog = async (userId: string, req: Request) => {
  try {
    // Get the device's time from the request headers or use server time as fallback
    const deviceTime = req.headers['x-device-time'] 
      ? new Date(req.headers['x-device-time'] as string) 
      : new Date();
    
    // Format time in 12-hour format
    const formattedTime = formatTime12Hour(deviceTime);
    
    // Get user details
    const user = await User.findById(userId).select('username email role');
    
    await Log.create({
      userId,
      action: 'LOGIN',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      details: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        loginTime: deviceTime,
        formattedLoginTime: formattedTime
      }
    });
  } catch (error) {
    console.error('Error creating login log:', error);
  }
};

export const createLogoutLog = async (userId: string, req: Request) => {
  try {
    console.log('Creating logout log for user:', userId);
    
    const user = await User.findById(userId).select('username email role');
    console.log('User found:', user ? 'Yes' : 'No');
    
    // Get the device's time from the request headers or use server time as fallback
    const deviceTime = req.headers['x-device-time'] 
      ? new Date(req.headers['x-device-time'] as string) 
      : new Date();
    
    // Format time in 12-hour format
    const formattedTime = formatTime12Hour(deviceTime);
    console.log('Formatted logout time:', formattedTime);
    
    const logEntry = await Log.create({
      userId,
      action: 'LOGOUT',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      details: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        logoutTime: deviceTime,
        formattedLogoutTime: formattedTime
      }
    });
    
    console.log('Logout log created successfully:', logEntry._id);
  } catch (error) {
    console.error('Error creating logout log:', error);
  }
};

export const getLoginLogs = async () => {
  try {
    const logs = await Log.find()
      .populate('userId', 'username email')
      .sort({ timestamp: -1 });
    
    // Process logs to ensure times are properly formatted
    return logs.map(log => {
      const logObj = log.toObject();
      
      // Ensure login time is formatted
      if (logObj.action === 'LOGIN' && logObj.details) {
        if (!logObj.details.formattedLoginTime && logObj.details.loginTime) {
          const loginTime = new Date(logObj.details.loginTime);
          logObj.details.formattedLoginTime = formatTime12Hour(loginTime);
        }
      }
      
      // Ensure logout time is formatted
      if (logObj.action === 'LOGOUT' && logObj.details) {
        if (!logObj.details.formattedLogoutTime && logObj.details.logoutTime) {
          const logoutTime = new Date(logObj.details.logoutTime);
          logObj.details.formattedLogoutTime = formatTime12Hour(logoutTime);
        }
      }
      
      return logObj;
    });
  } catch (error) {
    console.error('Error fetching login logs:', error);
    throw error;
  }
};

// Get a user's complete login history with both login and logout times
export const getUserLoginHistory = async (userId: string) => {
  try {
    // Get all login and logout logs for the user
    const logs = await Log.find({ userId })
      .sort({ timestamp: 1 }); // Sort by timestamp ascending to get chronological order
    
    // Process logs to create a complete login history
    const loginHistory = [];
    let currentLogin: any = null;
    
    for (const log of logs) {
      const logObj = log.toObject();
      
      if (logObj.action === 'LOGIN') {
        // If we find a login, start a new login session
        currentLogin = {
          loginId: logObj._id,
          loginTime: logObj.details?.loginTime || null,
          formattedLoginTime: logObj.details?.formattedLoginTime || 
            (logObj.details?.loginTime ? formatTime12Hour(new Date(logObj.details.loginTime)) : null),
          logoutTime: null,
          formattedLogoutTime: null,
          ipAddress: logObj.ipAddress,
          userAgent: logObj.userAgent,
          username: logObj.details?.username,
          email: logObj.details?.email,
          role: logObj.details?.role
        };
        loginHistory.push(currentLogin);
      } else if (logObj.action === 'LOGOUT' && currentLogin) {
        // If we find a logout, update the current login session
        currentLogin.logoutTime = logObj.details?.logoutTime || null;
        currentLogin.formattedLogoutTime = logObj.details?.formattedLogoutTime || 
          (logObj.details?.logoutTime ? formatTime12Hour(new Date(logObj.details.logoutTime)) : null);
        currentLogin = null; // Reset current login
      }
    }
    
    return loginHistory;
  } catch (error) {
    console.error('Error fetching user login history:', error);
    throw error;
  }
}; 