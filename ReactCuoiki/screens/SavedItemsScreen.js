import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SavedItemsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Mock saved items - replace with actual data from your API
  const savedItems = [
    { id: 1, name: 'Product 1', price: '$99.99', image: 'https://picsum.photos/700' },
    { id: 2, name: 'Product 2', price: '$149.99', image: 'https://picsum.photos/701' },
    { id: 3, name: 'Product 3', price: '$199.99', image: 'https://picsum.photos/702' },
  ];

  const handleRemove = (id) => {
    // TODO: Implement remove from saved items
    console.log('Remove item:', id);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.price}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="heart"
          iconColor="#ff4444"
          onPress={() => handleRemove(item.id)}
        />
        <IconButton
          icon="cart"
          onPress={() => {/* TODO: Implement add to cart */}}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Title>No saved items</Title>
            <Paragraph>Items you save will appear here</Paragraph>
          </View>
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
  listContainer: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SavedItemsScreen; 