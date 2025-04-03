import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const SignUp = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm your password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select user type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userType}
              onValueChange={(itemValue) => setUserType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Instructor" value="instructor" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: height * 0.08,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  picker: {
    height: 48,
    width: '100%',
  },
  signUpButton: {
    backgroundColor: '#000000',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666666',
    fontSize: 14,
  },
  loginLink: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUp; 