import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const InstructorScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Instructor!</Text>
      <Text style={styles.subtitle}>Welcome, {user?.username}</Text>
      <Text style={styles.userId}>Instructor ID: {user?.userId}</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  userId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InstructorScreen; 