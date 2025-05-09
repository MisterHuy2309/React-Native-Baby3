import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Paragraph, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigation.navigate('Cart');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <Image source={product.image} style={styles.image} />
        
        <View style={styles.content}>
          <Title style={styles.title}>{product.name}</Title>
          
          <View style={styles.priceContainer}>
            <Title style={styles.price}>{formatPrice(product.price)}</Title>
            <Chip icon="star" style={styles.rating}>
              {product.rating} ({product.reviews} đánh giá)
            </Chip>
          </View>

          <View style={styles.quantityContainer}>
            <Title style={styles.quantityLabel}>Số lượng:</Title>
            <View style={styles.quantityControls}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <Title style={styles.quantity}>{quantity}</Title>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => setQuantity(quantity + 1)}
              />
            </View>
          </View>

          <Card style={styles.descriptionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Mô tả sản phẩm</Title>
              <Paragraph style={styles.description}>{product.description}</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.detailsCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Thông tin chi tiết</Title>
              <View style={styles.detailsRow}>
                <Paragraph style={styles.detailLabel}>Danh mục:</Paragraph>
                <Paragraph>{product.category}</Paragraph>
              </View>
              <View style={styles.detailsRow}>
                <Paragraph style={styles.detailLabel}>Tình trạng:</Paragraph>
                <Paragraph style={styles.inStock}>
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          disabled={!product.inStock}
        >
          Thêm vào giỏ hàng
        </Button>
      </View>
    </View>
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
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    color: '#e91e63',
    fontSize: 28,
  },
  rating: {
    backgroundColor: '#fff3e0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 18,
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  descriptionCard: {
    marginBottom: 16,
  },
  detailsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    width: 100,
  },
  inStock: {
    color: '#4caf50',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  addToCartButton: {
    padding: 8,
  },
});

export default ProductDetailScreen; 