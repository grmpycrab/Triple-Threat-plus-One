import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
import SuccessModal from '../components/SuccessModal';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StudentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    setShowSuccessModal(true);
    
    setTimeout(async () => {
      await logout();
      setShowSuccessModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 1500);
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Student Dashboard</Text>
          <TouchableOpacity
            style={styles.logoutIconButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileCard}>
          <View style={styles.profileIconContainer}>
            <Ionicons name="person-circle" size={80} color="#2eada6" />
          </View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.username}</Text>
          <View style={styles.idContainer}>
            <Ionicons name="school-outline" size={20} color="#666" />
            <Text style={styles.idText}>Student ID: {user?.userId}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.instructionText}>
            Access your student resources and activities through the dashboard.
          </Text>
        </View>
      </View>

      <LogoutConfirmationModal
        visible={logoutModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

      <SuccessModal 
        visible={showSuccessModal}
        message="Logout Successful!"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2eada6',
  },
  headerContainer: {
    backgroundColor: '#2eada6',
    padding: 20,
    paddingTop: 60, // Increased for status bar
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  logoutIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  profileIconContainer: {
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2eada6',
    marginBottom: 15,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  idText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default StudentScreen; 