import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AdminDrawerParamList } from '../navigation/types';
import { userAPI } from '../services/api';

type NavigationProp = DrawerNavigationProp<AdminDrawerParamList>;

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'student' | 'instructor';
  userId: string;
}

const ManageUser: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getUsers();
      setUsers(data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddUser = () => {
    setEditingUser(null);
    setUsername('');
    setEmail('');
    setRole('student');
    setUserId('');
    setModalVisible(true);
  };
  
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setUserId(user.userId);
    setModalVisible(true);
  };
  
  const handleDeleteUser = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await userAPI.deleteUser(id);
              fetchUsers();
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to delete user');
            }
          }
        }
      ]
    );
  };
  
  const handleSaveUser = async () => {
    if (!username || !email || !userId) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (role === 'student' && !/^\d{4}-\d{4}$/.test(userId)) {
      Alert.alert('Error', 'Invalid student ID format. Use format: YYYY-XXXX');
      return;
    }
    
    if (role === 'instructor' && !/^T-\d{4}$/.test(userId)) {
      Alert.alert('Error', 'Invalid instructor ID format. Use format: T-YYYY');
      return;
    }
    
    try {
      if (editingUser) {
        await userAPI.updateUser(editingUser._id, {
          username,
          email,
          role,
          userId
        });
      } else {
        await userAPI.createUser({
          username,
          email,
          role,
          userId
        });
      }
      
      setModalVisible(false);
      fetchUsers();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to save user');
    }
  };
  
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>
          {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
        </Text>
        <Text style={styles.userId}>ID: {item.userId}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEditUser(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDeleteUser(item._id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Users</Text>
          <View style={styles.backButton} /> {/* Empty view for flex spacing */}
        </View>
      </View>

      <View style={[styles.contentContainer, { marginTop: 0 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>User List</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
            <Text style={styles.addButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#2eada6" style={styles.loader} />
        ) : (
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Role:</Text>
              <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue as 'student' | 'instructor')}
              >
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Instructor" value="instructor" />
              </Picker>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder={role === 'student' ? "Student ID (YYYY-XXXX)" : "Instructor ID (T-YYYY)"}
              value={userId}
              onChangeText={setUserId}
            />
            
            {!editingUser && (
              <Text style={styles.infoText}>
                Note: The user ID will be used as the password for login.
              </Text>
            )}
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSaveUser}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#2eada6',
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2eada6',
  },
  addButton: {
    backgroundColor: '#2eada6',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2eada6',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    marginBottom: 2,
  },
  userRole: {
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  userId: {
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#2eada6',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2eada6',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#424242',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  pickerLabel: {
    padding: 15,
    paddingBottom: 0,
    color: '#666',
  },
  picker: {
    height: 50,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  saveButton: {
    backgroundColor: '#2eada6',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  infoText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ManageUser; 