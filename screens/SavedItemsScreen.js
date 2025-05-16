import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Card, IconButton, Searchbar } from 'react-native-paper';
import { getSavedItems } from '../services/api';

const SavedItemsScreen = ({ navigation }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSavedItems = async () => {
    try {
      setLoading(true);
      const response = await getSavedItems();
      setSavedItems(response.data);
    } catch (error) {
      console.error('Error fetching saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const filteredItems = savedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Card.Cover source={{ uri: item.image }} style={styles.itemImage} />
        <Card.Content>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </Card.Content>
      </TouchableOpacity>
      <Card.Actions>
        <IconButton
          icon="cart-plus"
          size={24}
          onPress={() => {
            // Add to cart functionality
          }}
        />
        <IconButton
          icon="heart"
          size={24}
          color="#FF3B30"
          onPress={() => {
            // Remove from saved items
          }}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search saved items..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.itemsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved items found</Text>
          <Text style={styles.emptySubText}>
            Items you save will appear here
          </Text>
        </View>
      )}
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
  itemsList: {
    padding: 8,
  },
  itemCard: {
    flex: 1,
    margin: 8,
    maxWidth: '45%',
  },
  itemImage: {
    height: 150,
  },
  itemTitle: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SavedItemsScreen; 