import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiClient, ENDPOINTS } from '../config/api';

const SignInScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        OpenDyslexic: require('../assets/fonts/OpenDyslexic-Regular.otf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#66BBFF" />;
  }

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(ENDPOINTS.signin, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('username', response.data.username); // Store username if needed
      setIsAuthenticated(true);
      navigation.replace('HomeScreen'); // Redirect to HomeScreen on success
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>READ AID</Text>

          <Text style={styles.subtitle}>Sign in</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.passwordInput, { flex: 1 }]}
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.eyeIcon}
            >
              <Icon
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator size="large" color="#66BBFF" />}

          <TouchableOpacity
            onPress={() => {
              if (!email.trim()) {
                Alert.alert('Error', 'Please enter your email to reset password.');
                return;
              }
              navigation.navigate('ForgetPassword', { email });
            }}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or sign in with:</Text>

          <TouchableOpacity style={styles.googleIcon} onPress={() => navigation.navigate('SignInWithGoogle')}>
            <Icon name="logo-google" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Don't have an Account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1E7FF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginVertical: 15,
    fontFamily: 'OpenDyslexic',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 15,
    fontFamily: 'OpenDyslexic',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 15,
    fontFamily: 'OpenDyslexic',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  passwordInput: {
    fontFamily: 'OpenDyslexic',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    marginLeft: 10,
    alignItems: 'center',
  },
  forgotPassword: {
    color: 'blue',
    fontFamily: 'OpenDyslexic',
    textAlign: 'center',
    marginVertical: 10,
  },
  orText: {
    textAlign: 'center',
    fontFamily: 'OpenDyslexic',
    marginVertical: 10,
    marginTop: 20,
  },
  googleIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    margin: 10,
  },
  signUpText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'OpenDyslexic',
    color: 'blue',
  },
  signInButton: {
    backgroundColor: '#66BBFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 3,
    alignSelf: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenDyslexic',
  },
});

export default SignInScreen;
