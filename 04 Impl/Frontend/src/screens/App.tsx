import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AdminScreen from './AdminScreen';
import InstructorScreen from './InstructorScreen';
import Login from './Login';
import StudentScreen from './StudentScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {user ? (
          // User is logged in
          user.role === 'admin' ? (
            <Stack.Screen 
              name="Admin" 
              component={AdminScreen} 
              options={{ title: 'Admin Dashboard' }}
            />
          ) : user.role === 'instructor' ? (
            <Stack.Screen 
              name="Instructor" 
              component={InstructorScreen} 
              options={{ title: 'Instructor Dashboard' }}
            />
          ) : (
            <Stack.Screen 
              name="Student"
              component={StudentScreen} 
              options={{ title: 'Student Dashboard' }}
            />
          )
        ) : (
          // User is not logged in
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ title: 'Login' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 