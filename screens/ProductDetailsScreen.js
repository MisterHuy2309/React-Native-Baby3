import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Button, IconButton, Divider } from 'react-native-paper';
import { addToCart, saveItem } from '../services/api';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product.id, quantity);
      // Show success message or navigate to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItem = async () => {
    try {
      await saveItem(product.id);
      setSaved(!saved);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{product.title}</Text>
        <IconButton
          icon={saved ? 'heart' : 'heart-outline'}
          size={24}
          onPress={handleSaveItem}
          color={saved ? '#FF3B30' : '#000'}
        />
      </View>

      <Text style={styles.price}>${product.price}</Text>
      
      <Divider style={styles.divider} />
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <View style={styles.quantityControls}>
          <IconButton
            icon="minus"
            size={20}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <IconButton
            icon="plus"
            size={20}
            onPress={() => setQuantity(quantity + 1)}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.specificationsContainer}>
        <Text style={styles.sectionTitle}>Specifications</Text>
        {Object.entries(product.specifications || {}).map(([key, value]) => (
          <View key={key} style={styles.specificationRow}>
            <Text style={styles.specificationKey}>{key}:</Text>
            <Text style={styles.specificationValue}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleAddToCart}
          loading={loading}
          style={styles.addToCartButton}
        >
          Add to Cart
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  descriptionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  specificationsContainer: {
    padding: 16,
  },
  specificationRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  specificationKey: {
    fontSize: 16,
    fontWeight: '500',
    width: 120,
  },
  specificationValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  addToCartButton: {
    paddingVertical: 8,
  },
});

export default ProductDetailsScreen; 