import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';

const defaultUser = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  address: '123 Main St, City, Country',
  avatar: 'https://via.placeholder.com/80',
};

const Profile = () => {
  const [user, setUser] = useState(defaultUser);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleEdit = () => {
    setEditData(user);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!editData.name || !editData.email || !editData.phone || !editData.address) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setUser(editData);
    setEditing(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin cá nhân!');
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      {editing ? (
        <>
          <TextInput
            style={styles.input}
            value={editData.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Họ tên"
          />
          <TextInput
            style={styles.input}
            value={editData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={editData.phone}
            onChangeText={text => handleChange('phone', text)}
            placeholder="Số điện thoại"
          />
          <TextInput
            style={styles.input}
            value={editData.address}
            onChangeText={text => handleChange('address', text)}
            placeholder="Địa chỉ"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#636e72' }]} onPress={() => setEditing(false)}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>Tên đăng nhập: {user.username}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>Số điện thoại: {user.phone}</Text>
          <Text style={styles.info}>Địa chỉ: {user.address}</Text>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 32, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#2d3436' },
  info: { fontSize: 16, color: '#636e72', marginBottom: 4 },
  button: {
    backgroundColor: '#0984e3',
    padding: 12,
    borderRadius: 8,
    marginTop: 18,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#b2bec3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    width: 250,
  },
});

export default Profile;