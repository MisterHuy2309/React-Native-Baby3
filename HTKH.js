import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { io } from 'socket.io-client';

const socket = io('http://10.0.7.92:4000'); // Thay <YOUR_PC_IP> bằng IP máy tính chạy ws-server.js

const HTKH = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setChat(prev => [...prev, { from: 'server', text: msg }]);
    });
    return () => socket.off('receive_message');
  }, []);

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung cần hỗ trợ');
      return;
    }
    socket.emit('send_message', message);
    setChat(prev => [...prev, { from: 'me', text: message }]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hỗ Trợ Khách Hàng (Chat realtime)</Text>
      <FlatList
        data={chat}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text style={item.from === 'me' ? styles.me : styles.server}>
            {item.from === 'me' ? 'Bạn: ' : 'Hỗ trợ: '}
            {item.text}
          </Text>
        )}
        style={{ flex: 1, marginBottom: 12 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung hỗ trợ..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Gửi hỗ trợ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#0984e3' },
  input: {
    borderWidth: 1, borderColor: '#b2bec3', borderRadius: 8,
    padding: 12, marginBottom: 12, fontSize: 16, backgroundColor: '#f9f9f9', minHeight: 40,
  },
  button: {
    backgroundColor: '#00b894', padding: 14, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  me: { alignSelf: 'flex-end', color: '#00b894', marginVertical: 2, fontSize: 16 },
  server: { alignSelf: 'flex-start', color: '#636e72', marginVertical: 2, fontSize: 16 },
});

export default HTKH;