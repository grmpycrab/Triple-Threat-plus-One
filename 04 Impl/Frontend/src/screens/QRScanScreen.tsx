import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Modal,
} from 'react-native';
import { StudentDrawerParamList } from '../navigation/types';

type NavigationProp = DrawerNavigationProp<StudentDrawerParamList>;

const QRScanScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showScanner, setShowScanner] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);

  const handleStartCamera = () => {
    setShowScanner(true);
    // Here you would typically implement the actual camera/QR scanning functionality
    // For now, we'll simulate a successful scan after a delay
    setTimeout(() => {
      handleSuccessfulScan('ATTENDANCE-406594');
    }, 2000);
  };

  const handleSuccessfulScan = (code: string) => {
    setShowScanner(false);
    setConfirmationCode(code);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.toggleDrawer()}
          >
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR Code Attendance</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>QR CODE{'\n'}ATTENDANCE</Text>
          <Text style={styles.subtitle}>Scan the QR code to mark your attendance</Text>

          <View style={styles.scannerContainer}>
            {!showScanner ? (
              <View style={styles.placeholderContainer}>
                <Ionicons name="camera-outline" size={48} color="#666" />
                <Text style={styles.placeholderText}>
                  Tap the button below to start scanning QR codes
                </Text>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={handleStartCamera}
                >
                  <Text style={styles.startButtonText}>Start Camera</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.scannerView}>
                {/* Camera view would go here */}
                <Text style={styles.scanningText}>Scanning...</Text>
              </View>
            )}
          </View>

          {confirmationCode && (
            <View style={styles.confirmationCard}>
              <View style={styles.confirmationHeader}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text style={styles.confirmationTitle}>Attendance Confirmed</Text>
              </View>
              <Text style={styles.confirmationText}>
                Your attendance has been recorded with code:
              </Text>
              <Text style={styles.confirmationCode}>{confirmationCode}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.manualButton}
            onPress={handleManualEntry}
          >
            <Text style={styles.manualButtonText}>Enter Code Manually</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Entry Modal */}
      <Modal
        visible={showManualEntry}
        transparent
        animationType="slide"
        onRequestClose={() => setShowManualEntry(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Attendance Code</Text>
            {/* Add your input field here */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowManualEntry(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2eada6',
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
    width: '100%',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  scannerContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scannerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: 'white',
    fontSize: 16,
  },
  confirmationCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  confirmationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  confirmationCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  manualButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
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
  manualButtonText: {
    color: '#2eada6',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalCloseButton: {
    marginTop: 'auto',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScanScreen; 