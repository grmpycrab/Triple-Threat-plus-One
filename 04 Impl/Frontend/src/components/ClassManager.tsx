import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClassNavigationParamList, InstructorDrawerParamList } from '../navigation/types';
import ClassDashboard from './class/ClassDashboard';
import ClassList from './class/ClassList';
import ManageClass from './class/ManageClass';

type NavigationProp = DrawerNavigationProp<InstructorDrawerParamList>;
const Tab = createBottomTabNavigator<ClassNavigationParamList>();

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;
const INDICATOR_WIDTH = 24;
const INDICATOR_OFFSET = (TAB_WIDTH - INDICATOR_WIDTH) / 2;

interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  size?: number;
}

const TabIcon = ({ name, focused, size = 24 }: TabIconProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 10,
    }).start();
  }, [focused]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={focused ? name : `${name}-outline` as keyof typeof Ionicons.glyphMap}
          size={size}
          color={focused ? 'white' : 'rgba(255, 255, 255, 0.6)'}
        />
      </Animated.View>
    </View>
  );
};

const ClassManager: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    Animated.spring(slideAnim, {
      toValue: (index * TAB_WIDTH) + INDICATOR_OFFSET,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  };

  useEffect(() => {
    // Initialize line position to first tab
    slideAnim.setValue(INDICATOR_OFFSET);
  }, []);

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Manager</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#2eada6',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.2)',
              height: 70,
              paddingTop: 8,
              paddingBottom: 12,
            },
            tabBarShowLabel: false,
            tabBarItemStyle: {
              paddingBottom: 4,
            },
          }}
          screenListeners={({ navigation }) => ({
            tabPress: (e) => {
              const index = navigation.getState().index;
              handleTabPress(index);
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={ClassDashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon name="grid" focused={focused} />
              ),
            }}
            listeners={{
              tabPress: () => handleTabPress(0),
            }}
          />
          <Tab.Screen 
            name="Manage" 
            component={ManageClass}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon name="settings" focused={focused} />
              ),
            }}
            listeners={{
              tabPress: () => handleTabPress(1),
            }}
          />
          <Tab.Screen 
            name="List" 
            component={ClassList}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon name="list" focused={focused} />
              ),
            }}
            listeners={{
              tabPress: () => handleTabPress(2),
            }}
          />
        </Tab.Navigator>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            width: INDICATOR_WIDTH,
            height: 3,
            backgroundColor: 'white',
            borderRadius: 1.5,
            transform: [{ translateX: slideAnim }],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    flex: 1,
  },
});

export default ClassManager; 