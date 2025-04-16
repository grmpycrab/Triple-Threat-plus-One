export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Admin: undefined;
  Instructor: undefined;
  Student: undefined;
};

export type UserRole = 'student' | 'instructor' | 'admin';

export type AdminDrawerParamList = {
  Dashboard: undefined;
  ManageUsers: undefined;
  ViewLogs: undefined;
};

export type InstructorDrawerParamList = {
  Dashboard: undefined;
  AttendanceTracker: undefined;
  ClassManager: undefined;
};

export type AttendanceNavigationParamList = {
  Home: undefined;
  QRCode: undefined;
  Manual: undefined;
};

export type ClassNavigationParamList = {
  Dashboard: undefined;
  Manage: undefined;
  List: undefined;
}; 