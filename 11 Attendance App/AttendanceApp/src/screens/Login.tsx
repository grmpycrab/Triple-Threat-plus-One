import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity onPress={() => {/* Handle forgot password */}}>
            <Text style={styles.forgotPassword}>forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingTop: height * 0.15,
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
  forgotPassword: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#000000',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#666666',
    fontSize: 14,
  },
  signupLink: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login; 