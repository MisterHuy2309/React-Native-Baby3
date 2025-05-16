import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { Text, Card, Searchbar, Chip } from 'react-native-paper';
import { getProducts } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Card style={styles.productCard}>
        <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
        <Card.Content>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
              style={styles.categoryChip}
              mode="outlined"
            >
              {item.name}
            </Chip>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    maxWidth: '45%',
  },
  productImage: {
    height: 150,
  },
  productTitle: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
});

export default HomeScreen; 