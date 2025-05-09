import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Chip, Paragraph, Searchbar, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();
  const category = route.params?.category || 'All';

  // Mock data - replace with actual data from your API
  const [items] = useState([
    { id: 1, name: 'Product 1', price: '$99.99', category: 'Electronics' },
    { id: 2, name: 'Product 2', price: '$149.99', category: 'Clothing' },
    { id: 3, name: 'Product 3', price: '$199.99', category: 'Books' },
    { id: 4, name: 'Product 4', price: '$299.99', category: 'Home' },
  ]);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (category === 'All' || item.category === category)
  );

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.price}</Paragraph>
        <View style={styles.chipContainer}>
          <Chip>{item.category}</Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search items..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 0,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default ItemsScreen; 