import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Student {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late';
  date: string;
}

interface AttendanceListProps {
  classId: string;
  className: string;
  subjectCode: string;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ classId, className, subjectCode }) => {
  // This would typically come from your API/database
  const mockAttendanceData: Student[] = [
    { id: '1', name: 'John Doe', status: 'present', date: '2024-04-16' },
    { id: '2', name: 'Jane Smith', status: 'absent', date: '2024-04-16' },
    { id: '3', name: 'Mike Johnson', status: 'late', date: '2024-04-16' },
  ];

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'present':
        return '#4CAF50';
      case 'absent':
        return '#F44336';
      case 'late':
        return '#FFC107';
      default:
        return '#666';
    }
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.studentRow}>
      <Text style={styles.studentName}>{item.name}</Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.className}>{className}</Text>
        <Text style={styles.subjectCode}>{subjectCode}</Text>
      </View>
      <FlatList
        data={mockAttendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2eada6',
  },
  subjectCode: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentName: {
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AttendanceList; 