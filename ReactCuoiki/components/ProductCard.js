import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product })}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Cover source={product.image} style={styles.image} />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{product.name}</Title>
          <Paragraph style={styles.price}>{formatPrice(product.price)}</Paragraph>
          <View style={styles.ratingContainer}>
            <Paragraph style={styles.rating}>⭐ {product.rating}</Paragraph>
            <Paragraph style={styles.reviews}>({product.reviews} đánh giá)</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={() => navigation.navigate('ProductDetail', { product })}>
            Xem chi tiết
          </Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
  },
  card: {
    elevation: 4,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#e91e63',
    fontWeight: 'bold',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    justifyContent: 'center',
    padding: 8,
  },
});

export default ProductCard; 