import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import SplashScreen from './Screens/ReadAid'; 
import SignInScreen from './SignIn'; 
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated by retrieving the token from storage
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token); // Convert token existence into boolean
      } catch (error) {
        console.error('Error retrieving authentication token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  //if (loading) {
  //  return <SplashScreen />; // Show splash screen while checking authentication
  //}

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Authenticated users go directly to HomeScreen
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          // Unauthenticated users see authentication screens
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignInScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
