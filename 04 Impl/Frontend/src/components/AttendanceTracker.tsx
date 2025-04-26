import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AttendanceHome from './attendance/AttendanceHome';
import ManualAttendance from './attendance/ManualAttendance';
import QRScanner from './attendance/QRScanner';

type ComponentType = 'home' | 'qr' | 'manual';

const AttendanceTracker: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'qr':
        return <QRScanner />;
      case 'manual':
        return <ManualAttendance />;
      default:
        return <AttendanceHome />;
    }
  };

  const GridItem = ({ 
    icon, 
    label, 
    value, 
    isActive 
  }: { 
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: ComponentType;
    isActive: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.gridItem, isActive && styles.activeGridItem]}
      onPress={() => setActiveComponent(value)}
    >
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <Ionicons 
          name={icon} 
          size={32} 
          color={isActive ? '#2eada6' : '#666'} 
        />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <GridItem
          icon="stats-chart"
          label="Overview"
          value="home"
          isActive={activeComponent === 'home'}
        />
        <GridItem
          icon="qr-code"
          label="QR Scanner"
          value="qr"
          isActive={activeComponent === 'qr'}
        />
        <GridItem
          icon="create"
          label="Manual Entry"
          value="manual"
          isActive={activeComponent === 'manual'}
        />
      </View>
      <View style={styles.componentContainer}>
        {renderComponent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  activeGridItem: {
    backgroundColor: 'rgba(46, 173, 166, 0.1)',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(46, 173, 166, 0.2)',
  },
  label: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#2eada6',
    fontWeight: 'bold',
  },
  componentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default AttendanceTracker; 