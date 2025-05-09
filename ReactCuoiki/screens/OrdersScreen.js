import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title } from 'react-native-paper';

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'completed',
    total: 1500000,
    items: [
      { id: '1', name: 'Gấu Teddy Classic', quantity: 1, price: 800000 },
      { id: '2', name: 'Gấu Teddy Mini', quantity: 2, price: 350000 },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-03-10',
    status: 'processing',
    total: 950000,
    items: [
      { id: '3', name: 'Gấu Teddy Premium', quantity: 1, price: 950000 },
    ],
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#4CAF50';
    case 'processing':
      return '#2196F3';
    case 'cancelled':
      return '#F44336';
    default:
      return '#757575';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'processing':
      return 'Đang xử lý';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

const OrderCard = ({ order }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View>
            <Title style={styles.orderNumber}>{order.orderNumber}</Title>
            <Text style={styles.date}>{formatDate(order.date)}</Text>
          </View>
          <Chip
            mode="flat"
            style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
            textStyle={styles.statusText}
          >
            {getStatusText(order.status)}
          </Chip>
        </View>

        <View style={styles.itemsContainer}>
          {order.items.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalPrice}>{formatPrice(order.total)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockOrders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 18,
  },
  date: {
    color: '#666',
    marginTop: 4,
  },
  statusChip: {
    height: 24,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#e91e63',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    color: '#e91e63',
    fontWeight: 'bold',
  },
});

export default OrdersScreen; 