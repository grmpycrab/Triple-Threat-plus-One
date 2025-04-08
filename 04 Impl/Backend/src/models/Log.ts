import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  userId: mongoose.Types.ObjectId;
  action: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: {
    username?: string;
    email?: string;
    role?: string;
    loginTime?: Date;
    formattedLoginTime?: string;
    logoutTime?: Date;
    formattedLogoutTime?: string;
  };
}

const LogSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true, enum: ['LOGIN', 'LOGOUT'] },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  details: {
    username: String,
    email: String,
    role: String,
    loginTime: Date,
    formattedLoginTime: String,
    logoutTime: Date,
    formattedLogoutTime: String
  }
});

export default mongoose.model<ILog>('Log', LogSchema); 