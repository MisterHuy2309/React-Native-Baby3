import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
} from 'react-native';

const teddyData = [
  { name: 'Classic Teddy', price: 120000, image: 'https://cdn.pixabay.com/photo/2016/03/27/19/40/teddy-bear-1284370_1280.jpg' },
  { name: 'Pink Teddy', price: 150000, image: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/teddy-bear-1959616_1280.jpg' },
  { name: 'Big Brown Bear', price: 250000, image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/animal-1867121_1280.jpg' },
  { name: 'Cute Panda', price: 180000, image: 'https://cdn.pixabay.com/photo/2017/08/06/00/09/panda-2584306_1280.jpg' },
  { name: 'Mini Teddy', price: 90000, image: 'https://cdn.pixabay.com/photo/2014/12/21/23/50/teddy-bear-579254_1280.png' },
  { name: 'Couple Teddy', price: 300000, image: 'https://cdn.pixabay.com/photo/2016/03/27/19/40/teddy-bear-1284371_1280.jpg' },
];

const TeddyManager = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredTeddies = query === ''
    ? teddyData
    : teddyData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleSearch = (text) => {
    setQuery(text);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const addToCart = async (item) => {
    setCart([...cart, item]);
    try {
      await fetch('http:// 10.0.7.92/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.log('Lỗi lưu giỏ hàng:', error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Quản Lý Bán Gấu Bông</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm gấu bông..."
          value={query}
          onChangeText={handleSearch}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00b894" style={styles.spinner} />
      ) : (
        <FlatList
          data={filteredTeddies}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.teddyName}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
              <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
                <Text style={styles.buttonText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
        />
      )}

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Giỏ hàng ({cart.length})</Text>
        <FlatList
          data={cart}
          keyExtractor={(item, idx) => item.name + idx}
          renderItem={({ item }) => (
            <Text style={styles.cartItem}>{item.name} - {item.price.toLocaleString()} đ</Text>
          )}
        />
        <Text style={styles.total}>Tổng: {total.toLocaleString()} đ</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3436',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 45,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  spinner: {
    marginTop: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    shadowColor: '#636e72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  teddyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#0984e3',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#00b894',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartContainer: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#636e72',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cartTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#d35400',
  },
  cartItem: {
    fontSize: 15,
    color: '#636e72',
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#00b894',
    fontSize: 16,
    textAlign: 'right',
  },
});

export default TeddyManager;
