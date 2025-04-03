import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const GetStarted = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background gradient */}
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.gradient}
      />
      
      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar" size={80} color="#ffffff" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>AttendanceApp</Text>
          <Text style={styles.subtitle}>
            Track attendance with elegance and precision
          </Text>
        </View>
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.footerContainer}>
          <View style={styles.dot} />
          <Text style={styles.footerText}>Simple • Efficient • Reliable</Text>
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    top: -width * 0.2,
    right: -width * 0.2,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    bottom: -width * 0.1,
    left: -width * 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 60,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
    letterSpacing: 0.5,
  },
  bottomContainer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default GetStarted; 