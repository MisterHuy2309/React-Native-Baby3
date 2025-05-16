import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Button, IconButton, Divider } from 'react-native-paper';
import { getCart } from '../services/api';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCartItems();
    setRefreshing(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <IconButton
            icon="minus"
            size={20}
            onPress={() => {
              // Handle quantity decrease
            }}
          />
          <Text style={styles.quantity}>{item.quantity}</Text>
          <IconButton
            icon="plus"
            size={20}
            onPress={() => {
              // Handle quantity increase
            }}
          />
        </View>
      </View>
      <IconButton
        icon="delete"
        size={24}
        onPress={() => {
          // Handle item removal
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                // Handle checkout
              }}
              style={styles.checkoutButton}
            >
              Proceed to Checkout
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            style={styles.shopNowButton}
          >
            Shop Now
          </Button>
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    paddingVertical: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    paddingHorizontal: 24,
  },
});

export default CartScreen; 