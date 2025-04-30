import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AttendanceList from './AttendanceList';

interface Class {
  id: string;
  name: string;
  subjectCode: string;
}

const AttendanceHome: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // This would typically come from your API/database
  const mockClasses: Class[] = [
    { id: '1', name: 'Computer Science 101', subjectCode: 'CS101' },
    { id: '2', name: 'Data Structures', subjectCode: 'CS201' },
    { id: '3', name: 'Database Systems', subjectCode: 'CS301' },
  ];

  const renderClassItem = ({ item }: { item: Class }) => (
    <TouchableOpacity
      style={styles.classCard}
      onPress={() => setSelectedClass(item)}
    >
      <Text style={styles.className}>{item.name}</Text>
      <Text style={styles.subjectCode}>{item.subjectCode}</Text>
    </TouchableOpacity>
  );

  if (selectedClass) {
    return (
      <AttendanceList
        classId={selectedClass.id}
        className={selectedClass.name}
        subjectCode={selectedClass.subjectCode}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Classes</Text>
      <FlatList
        data={mockClasses}
        renderItem={renderClassItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2eada6',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  classCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default AttendanceHome; 