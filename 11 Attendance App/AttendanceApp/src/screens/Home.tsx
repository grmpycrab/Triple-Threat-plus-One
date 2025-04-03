import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background gradient */}
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.gradient}
      />
      
      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>AttendanceApp</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={70} color="#ffffff" />
          </View>
          <Text style={styles.title}>Welcome to Your Dashboard</Text>
          <Text style={styles.subtitle}>Start tracking attendance today</Text>
          
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.cardIconContainer}>
                <Ionicons name="calendar-outline" size={30} color="#ffffff" />
              </View>
              <Text style={styles.cardTitle}>Today's Attendance</Text>
              <Text style={styles.cardValue}>0</Text>
              <Text style={styles.cardSubtitle}>People checked in</Text>
            </View>
            
            <View style={styles.card}>
              <View style={styles.cardIconContainer}>
                <Ionicons name="stats-chart-outline" size={30} color="#ffffff" />
              </View>
              <Text style={styles.cardTitle}>Weekly Average</Text>
              <Text style={styles.cardValue}>85%</Text>
              <Text style={styles.cardSubtitle}>Attendance rate</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="add-circle-outline" size={24} color="#000000" />
              <Text style={styles.buttonText}>Mark Attendance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <Ionicons name="list-outline" size={24} color="#ffffff" />
              <Text style={styles.secondaryButtonText}>View Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    top: -width * 0.1,
    left: -width * 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    bottom: -width * 0.05,
    right: -width * 0.05,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Home; 