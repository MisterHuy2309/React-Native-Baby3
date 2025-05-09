import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, IconButton, Paragraph, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ navigation, route }) => {
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();
  const { id } = route.params;

  // Mock data - replace with actual data from your API
  const product = {
    id,
    name: `Product ${id}`,
    price: '$199.99',
    description: 'This is a detailed description of the product. It includes all the important features and specifications that a customer would want to know about.',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    images: [
      'https://picsum.photos/700',
      'https://picsum.photos/701',
      'https://picsum.photos/702',
    ],
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save functionality
  };

  const handleSelectFeatures = () => {
    navigation.navigate('SelectFeatures', { productId: id });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <IconButton
            icon={isSaved ? 'heart' : 'heart-outline'}
            size={30}
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>

        <View style={styles.content}>
          <Title style={styles.title}>{product.name}</Title>
          <Paragraph style={styles.price}>{product.price}</Paragraph>
          
          <Title style={styles.sectionTitle}>Description</Title>
          <Paragraph style={styles.description}>{product.description}</Paragraph>

          <Title style={styles.sectionTitle}>Features</Title>
          <View style={styles.featuresContainer}>
            {product.features.map((feature, index) => (
              <Chip key={index} style={styles.featureChip}>
                {feature}
              </Chip>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSelectFeatures}
              style={styles.button}
            >
              Select Features
            </Button>
            <Button
              mode="outlined"
              onPress={() => {/* TODO: Implement add to cart */}}
              style={styles.button}
            >
              Add to Cart
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#2196F3',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  featureChip: {
    margin: 5,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default ProductDetailsScreen; 