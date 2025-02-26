import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch stored username (if available)
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('username');
      if (storedUser) {
        setUsername(storedUser);
      }
    };
    loadUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Remove authentication token
    await AsyncStorage.removeItem('username'); // Remove username (if stored)
    navigation.replace('SignIn'); // Redirect to SignIn screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>🎉 Congratulations! 🎉</Text>
      <Text style={styles.messageText}>
        {username ? `Hello, ${username}!` : 'You have successfully logged in.'}
      </Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E7FF',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
