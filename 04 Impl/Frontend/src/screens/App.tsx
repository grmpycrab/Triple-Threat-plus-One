import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '../context/AuthContext';
import AdminNavigator from '../navigation/AdminNavigator';
import InstructorNavigator from '../navigation/InstructorNavigator';
import StudentNavigator from '../navigation/StudentNavigator';
import { RootStackParamList } from '../navigation/types';
import Login from './Login';
import SplashScreen from './SplashScreen';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                      component={AdminNavigator}
                    />
                  )}
                  {user.role === 'instructor' && (
                    <Stack.Screen 
                      name="Instructor" 
                      component={InstructorNavigator}
                    />
                  )}
                  {user.role === 'student' && (
                    <Stack.Screen 
                      name="Student" 
                      component={StudentNavigator}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App; 