import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const QRScanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="qr-code" size={80} color="#2eada6" />
      </View>
      <Text style={styles.title}>QR Code Scanner</Text>
      <Text style={styles.description}>
        Scan QR codes to mark student attendance quickly and efficiently.
      </Text>
      <View style={styles.scannerPlaceholder}>
        <Text style={styles.placeholderText}>Camera Preview</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2eada6',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  scannerPlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2eada6',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
});

export default QRScanner; 