import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Divider, Paragraph, RadioButton, TextInput, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CheckoutAssistanceScreen = ({ navigation }) => {
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    navigation.navigate('Checkout');
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.section}>
        <Title>Delivery Options</Title>
        <RadioButton.Group onValueChange={value => setDeliveryOption(value)} value={deliveryOption}>
          <View style={styles.option}>
            <RadioButton value="standard" />
            <View style={styles.optionContent}>
              <Paragraph>Standard Delivery</Paragraph>
              <Paragraph style={styles.price}>Free (3-5 business days)</Paragraph>
            </View>
          </View>
          <View style={styles.option}>
            <RadioButton value="express" />
            <View style={styles.optionContent}>
              <Paragraph>Express Delivery</Paragraph>
              <Paragraph style={styles.price}>$9.99 (1-2 business days)</Paragraph>
            </View>
          </View>
          <View style={styles.option}>
            <RadioButton value="pickup" />
            <View style={styles.optionContent}>
              <Paragraph>Store Pickup</Paragraph>
              <Paragraph style={styles.price}>Free (Available in 1 hour)</Paragraph>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Title>Special Instructions</Title>
        <TextInput
          label="Delivery Instructions"
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Title>Gift Options</Title>
        <View style={styles.giftOption}>
          <Checkbox
            status={giftWrap ? 'checked' : 'unchecked'}
            onPress={() => setGiftWrap(!giftWrap)}
          />
          <View style={styles.giftContent}>
            <Paragraph>Gift Wrap</Paragraph>
            <Paragraph style={styles.price}>$4.99</Paragraph>
          </View>
        </View>
        
        {giftWrap && (
          <TextInput
            label="Gift Message"
            value={giftMessage}
            onChangeText={setGiftMessage}
            multiline
            numberOfLines={2}
            style={styles.input}
          />
        )}
      </View>

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
        >
          Continue to Payment
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionContent: {
    marginLeft: 10,
    flex: 1,
  },
  price: {
    color: '#666',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  giftOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  giftContent: {
    marginLeft: 10,
    flex: 1,
  },
  button: {
    marginTop: 20,
    padding: 5,
  },
});

export default CheckoutAssistanceScreen; 