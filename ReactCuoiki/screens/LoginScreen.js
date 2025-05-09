import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = () => {
    if (isLogin) {
      login(email, password);
    } else {
      register(email, password, name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Title style={styles.title}>
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Title>
      </View>

      <View style={styles.form}>
        {!isLogin && (
          <TextInput
            label="Họ tên"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
          />
        )}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Button>

        <Button
          mode="text"
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin
            ? 'Chưa có tài khoản? Đăng ký ngay'
            : 'Đã có tài khoản? Đăng nhập'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    padding: 8,
  },
  switchButton: {
    marginTop: 16,
  },
});

export default LoginScreen; 