import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ViewLogs from '../components/ActivityLogs';
import ConfirmationModal from '../components/ConfirmationModal';
import ManageUser from '../components/ManageUser';
import SuccessModal from '../components/SuccessModal';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../screens/AdminScreen';
import { AdminDrawerParamList } from './types';

const Drawer = createDrawerNavigator<AdminDrawerParamList>();

const CustomDrawerContent = ({ navigation }: any) => {
  const { logout } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogoutPress = () => {
    setShowConfirmModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setShowConfirmModal(false);
      await logout();
      
      // Show success modal
      setShowSuccessModal(true);

      // Navigate after success modal animation
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 1500); // Reduced to 1.5 seconds for better UX
    } catch (error) {
      console.error('Logout error:', error);
      setShowConfirmModal(false);
      // Show error message if logout fails
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleLogoutCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Ionicons name="home-outline" size={24} color="#2eada6" />
        <Text style={styles.drawerItemText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('ManageUsers')}
      >
        <Ionicons name="people-outline" size={24} color="#2eada6" />
        <Text style={styles.drawerItemText}>Manage Users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('ViewLogs')}
      >
        <Ionicons name="list-outline" size={24} color="#2eada6" />
        <Text style={styles.drawerItemText}>Activity Logs</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.drawerItem, styles.logoutButton]}
        onPress={handleLogoutPress}
      >
        <Ionicons name="log-out-outline" size={24} color="#ff6b6b" />
        <Text style={[styles.drawerItemText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={showConfirmModal}
        title="Confirm Logout"
        message="Are you sure you want to logout from your account?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />

      <SuccessModal
        visible={showSuccessModal}
        message="Logged out successfully!"
        duration={1500}
      />
    </View>
  );
};

const AdminNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.7)',
        swipeEnabled: true,
        swipeEdgeWidth: 100,
        drawerStatusBarAnimation: 'slide',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={AdminDashboard}
        options={{
          swipeEnabled: true,
        }}
      />
      <Drawer.Screen 
        name="ManageUsers" 
        component={ManageUser}
        options={{
          swipeEnabled: true,
        }}
      />
      <Drawer.Screen 
        name="ViewLogs" 
        component={ViewLogs}
        options={{
          swipeEnabled: true,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#2eada6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#2eada6',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutText: {
    color: '#ff6b6b',
  },
});

export default AdminNavigator; 