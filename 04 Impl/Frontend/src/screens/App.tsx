import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import AdminScreen from './AdminScreen';
import InstructorScreen from './InstructorScreen';
import Login from './Login';
import SplashScreen from './SplashScreen';
import StudentScreen from './StudentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!loading) {
      // After the initial loading is complete, set isFirstLoad to false after splash screen duration
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 3500); // Match this with the total duration of splash screen animations

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2eada6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade'
        }}
      >
        {isFirstLoad ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            {user && (
              <>
                {user.role === 'admin' && (
                  <Stack.Screen 
                    name="Admin" 
                    component={AdminScreen} 
                    options={{ 
                      headerShown: true, 
                      title: 'Admin Dashboard',
                      animation: 'slide_from_right'
                    }} 
                  />
                )}
                {user.role === 'instructor' && (
                  <Stack.Screen 
                    name="Instructor" 
                    component={InstructorScreen} 
                    options={{ 
                      headerShown: true, 
                      title: 'Instructor Dashboard',
                      animation: 'slide_from_right'
                    }} 
                  />
                )}
                {user.role === 'student' && (
                  <Stack.Screen 
                    name="Student" 
                    component={StudentScreen} 
                    options={{ 
                      headerShown: true, 
                      title: 'Student Dashboard',
                      animation: 'slide_from_right'
                    }} 
                  />
                )}
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 