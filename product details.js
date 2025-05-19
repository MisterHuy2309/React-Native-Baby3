import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const product = {
  name: 'Gấu Bông Classic',
  image: 'https://cdn.pixabay.com/photo/2016/03/27/19/40/teddy-bear-1284370_1280.jpg',
  origin: 'Việt Nam',
  price: 120000,
  description: 'Gấu bông Classic mềm mại, an toàn cho trẻ nhỏ, phù hợp làm quà tặng cho mọi lứa tuổi.',
};

const ProductDetails = ({ navigation }) => {
  const [chat, setChat] = useState('');
  const [showBoxChat, setShowBoxChat] = useState(false);

  const handleOrder = async () => {
    try {
      const res = await fetch('http://<YOUR_PC_IP>:3000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: product.name, price: product.price }),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert('Đặt hàng thành công', 'Cảm ơn bạn đã đặt hàng!');
      } else {
        Alert.alert('Lỗi', data.message || 'Đặt hàng thất bại');
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể kết nối tới server');
    }
  };

  const handleSendChat = () => {
    if (!chat.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung chat');
      return;
    }
    Alert.alert('Đã gửi', 'Tin nhắn của bạn đã được gửi tới shop!');
    setChat('');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.origin}>Xuất xứ: {product.origin}</Text>
      <Text style={styles.price}>Giá: {product.price.toLocaleString()} đ</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
        <Text style={styles.orderText}>Đặt hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chatBtn} onPress={() => setShowBoxChat(!showBoxChat)}>
        <Text style={styles.chatText}>{showBoxChat ? 'Đóng boxchat' : 'Boxchat với shop'}</Text>
      </TouchableOpacity>

      {showBoxChat && (
        <View style={styles.boxChat}>
          <Text style={styles.boxChatTitle}>Chat với shop</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập nội dung..."
            value={chat}
            onChangeText={setChat}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendChat}>
            <Text style={styles.sendText}>Gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation?.goBack()}>
            <Text style={styles.continueText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: 180, height: 180, borderRadius: 16, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#2d3436' },
  origin: { fontSize: 16, color: '#636e72', marginBottom: 4 },
  price: { fontSize: 20, color: '#d35400', marginBottom: 8, fontWeight: 'bold' },
  desc: { fontSize: 16, color: '#636e72', marginBottom: 16, textAlign: 'center' },
  orderBtn: {
    backgroundColor: '#00b894', padding: 12, borderRadius: 8, marginBottom: 12, width: 180, alignItems: 'center'
  },
  orderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  chatBtn: {
    backgroundColor: '#0984e3', padding: 10, borderRadius: 8, marginBottom: 12, width: 180, alignItems: 'center'
  },
  chatText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  boxChat: {
    width: '100%', backgroundColor: '#f1f2f6', borderRadius: 10, padding: 16, marginTop: 10
  },
  boxChatTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#0984e3' },
  input: {
    borderWidth: 1, borderColor: '#b2bec3', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff'
  },
  sendBtn: {
    backgroundColor: '#00b894', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 8
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
  continueBtn: {
    backgroundColor: '#636e72', padding: 10, borderRadius: 8, alignItems: 'center'
  },
  continueText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductDetails;