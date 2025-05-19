import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://<YOUR_PC_IP>:3000/cart')
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, idx) => item._id || idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.price.toLocaleString()} đ</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
});

export default CartScreen;