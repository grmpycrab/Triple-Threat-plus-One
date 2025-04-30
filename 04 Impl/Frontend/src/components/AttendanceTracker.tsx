import React from 'react';
import { StyleSheet, View } from 'react-native';
import AttendanceHome from './attendance/AttendanceHome';

const AttendanceTracker: React.FC = () => {
  return (
    <View style={styles.container}>
      <AttendanceHome />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default AttendanceTracker; 