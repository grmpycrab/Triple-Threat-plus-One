import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ManageUser from '../components/ManageUser';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../screens/AdminScreen';
import { AdminDrawerParamList } from './types';

const Drawer = createDrawerNavigator<AdminDrawerParamList>();

const CustomDrawerContent = ({ navigation }: any) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.drawerContent}>
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
        style={[styles.drawerItem, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#ff6b6b" />
        <Text style={[styles.drawerItemText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
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
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={AdminDashboard}
      />
      <Drawer.Screen 
        name="ManageUsers" 
        component={ManageUser}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
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