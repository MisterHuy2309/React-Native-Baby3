import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, Title } from 'react-native-paper';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Title style={styles.emptyTitle}>Giỏ hàng trống</Title>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.continueShoppingButton}
        >
          Tiếp tục mua sắm
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartList}>
        {cartItems.map((item) => (
          <Card key={item.id} style={styles.cartItem}>
            <Card.Content style={styles.cartItemContent}>
              <Card.Cover source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Title style={styles.itemName}>{item.name}</Title>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                <View style={styles.quantityContainer}>
                  <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  />
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  />
                </View>
              </View>
              <IconButton
                icon="delete"
                size={24}
                onPress={() => removeFromCart(item.id)}
                style={styles.deleteButton}
              />
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tổng cộng:</Text>
            <Text style={styles.summaryValue}>{formatPrice(getCartTotal())}</Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.summaryActions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Checkout')}
            style={styles.checkoutButton}
          >
            Thanh toán
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    marginBottom: 20,
  },
  continueShoppingButton: {
    marginTop: 20,
  },
  cartList: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    marginBottom: 16,
  },
  cartItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  summaryCard: {
    margin: 16,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 20,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  summaryActions: {
    justifyContent: 'center',
    padding: 8,
  },
  checkoutButton: {
    flex: 1,
  },
});

export default CartScreen; 