import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Divider, List, Paragraph, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SelectFeaturesScreen = ({ navigation, route }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const insets = useSafeAreaInsets();
  const { productId } = route.params;

  // Mock features - replace with actual data from your API
  const features = [
    { id: 1, name: 'Feature 1', description: 'Description of feature 1', price: '$10' },
    { id: 2, name: 'Feature 2', description: 'Description of feature 2', price: '$20' },
    { id: 3, name: 'Feature 3', description: 'Description of feature 3', price: '$30' },
    { id: 4, name: 'Feature 4', description: 'Description of feature 4', price: '$40' },
  ];

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const calculateTotal = () => {
    return features
      .filter(feature => selectedFeatures.includes(feature.id))
      .reduce((total, feature) => total + parseInt(feature.price.replace('$', '')), 0);
  };

  const handleConfirm = () => {
    // TODO: Implement feature selection confirmation
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.content}>
        <Title style={styles.title}>Select Features</Title>
        <Paragraph style={styles.subtitle}>
          Choose the features you want to add to your product
        </Paragraph>

        {features.map((feature, index) => (
          <React.Fragment key={feature.id}>
            <List.Item
              title={feature.name}
              description={feature.description}
              right={props => (
                <View style={styles.featureRight}>
                  <Paragraph style={styles.price}>{feature.price}</Paragraph>
                  <Checkbox
                    status={selectedFeatures.includes(feature.id) ? 'checked' : 'unchecked'}
                    onPress={() => toggleFeature(feature.id)}
                  />
                </View>
              )}
            />
            {index < features.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Title>Total:</Title>
          <Title>${calculateTotal()}</Title>
        </View>
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.confirmButton}
        >
          Confirm Selection
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
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    color: '#666',
  },
  featureRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  confirmButton: {
    padding: 5,
  },
});

export default SelectFeaturesScreen; 