import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, IconButton, Text, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getOrder, updateOrderStatus } from '../services/api';

const ConfirmationScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const insets = useSafeAreaInsets();
  const { orderId } = route.params;

  useEffect(() => {
    loadUserAndOrder();
  }, []);

  const loadUserAndOrder = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      await fetchOrder();
    } catch (err) {
      console.log('Error loading user data:', err);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
        return;
      }
      const response = await getOrder(orderId);
      setOrder(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setUpdating(true);
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                navigation.replace('Login');
                return;
              }
              await updateOrderStatus(orderId, 'cancelled');
              await fetchOrder();
              Alert.alert('Success', 'Order has been cancelled');
            } catch (err) {
              Alert.alert('Error', 'Failed to cancel order');
            } finally {
              setUpdating(false);
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      navigation.replace('Login');
    } catch (err) {
      console.log('Error logging out:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Title>Order not found</Title>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA000';
      case 'processing': return '#2196F3';
      case 'shipped': return '#4CAF50';
      case 'delivered': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.successContainer}>
          <Image
            source={require('../assets/success.png')}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Title style={styles.successTitle}>Order Confirmed!</Title>
          <Text style={styles.orderNumber}>Order #{order._id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
          </View>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Order Details</Title>
            {order.items.map((item) => (
              <View key={item._id} style={styles.orderItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemQuantity}>x {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Shipping Information</Title>
            <View style={styles.infoRow}>
              <IconButton icon="account" size={20} />
              <Text style={styles.infoText}>{order.shippingAddress.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="map-marker" size={20} />
              <Text style={styles.infoText}>{order.shippingAddress.street}</Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="city" size={20} />
              <Text style={styles.infoText}>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <IconButton icon="phone" size={20} />
              <Text style={styles.infoText}>{order.shippingAddress.phone}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Payment Method</Title>
            <View style={styles.infoRow}>
              <IconButton 
                icon={order.paymentMethod === 'credit' ? 'credit-card' : 'paypal'} 
                size={20} 
              />
              <Text style={styles.infoText}>
                {order.paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        {order.status === 'pending' && (
          <Button
            mode="outlined"
            onPress={handleCancelOrder}
            style={[styles.button, styles.cancelButton]}
            loading={updating}
            disabled={updating}
          >
            Cancel Order
          </Button>
        )}
        <Button
          mode="contained"
          onPress={() => navigation.replace('MainApp')}
          style={styles.button}
        >
          Continue Shopping
        </Button>
        <Button
          mode="text"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  orderNumber: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    padding: 5,
    borderRadius: 8,
  },
  cancelButton: {
    marginBottom: 10,
    borderColor: '#F44336',
  },
  logoutButton: {
    marginTop: 10,
  },
});

export default ConfirmationScreen; 