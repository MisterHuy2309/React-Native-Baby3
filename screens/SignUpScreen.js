import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signup } from '../services/api';

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await signup({ name, email, password });
      // Handle successful signup (store token, navigate to home, etc.)
      console.log('Signup successful:', response);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            style={styles.button}
          >
            Sign Up
          </Button>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text>
              Already have an account? <Text style={styles.loginText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default SignUpScreen; 