import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SaveItem = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = async () => {
    if (!name || !desc) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      const res = await fetch('http://<YOUR_PC_IP>:3000/saveditem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, desc }),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert('Thành công', 'Đã lưu thông tin!');
        setName('');
        setDesc('');
      } else {
        Alert.alert('Lỗi', data.message || 'Lưu thất bại');
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể kết nối tới server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lưu thông tin sản phẩm</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={desc}
        onChangeText={setDesc}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#00b894',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default SaveItem;