import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, RadioButton, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PickupTimeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('');

  const insets = useSafeAreaInsets();

  const timeSlots = {
    today: [
      { id: '1', time: '10:00 AM - 12:00 PM' },
      { id: '2', time: '12:00 PM - 2:00 PM' },
      { id: '3', time: '2:00 PM - 4:00 PM' },
      { id: '4', time: '4:00 PM - 6:00 PM' },
    ],
    tomorrow: [
      { id: '5', time: '10:00 AM - 12:00 PM' },
      { id: '6', time: '12:00 PM - 2:00 PM' },
      { id: '7', time: '2:00 PM - 4:00 PM' },
      { id: '8', time: '4:00 PM - 6:00 PM' },
    ],
  };

  const handleContinue = () => {
    if (selectedTime) {
      navigation.navigate('Checkout');
    }
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.section}>
        <Title>Select Pickup Date</Title>
        <RadioButton.Group onValueChange={value => setSelectedDate(value)} value={selectedDate}>
          <View style={styles.dateOption}>
            <RadioButton value="today" />
            <View style={styles.dateContent}>
              <Paragraph>Today</Paragraph>
              <Paragraph style={styles.date}>{new Date().toLocaleDateString()}</Paragraph>
            </View>
          </View>
          <View style={styles.dateOption}>
            <RadioButton value="tomorrow" />
            <View style={styles.dateContent}>
              <Paragraph>Tomorrow</Paragraph>
              <Paragraph style={styles.date}>
                {new Date(Date.now() + 86400000).toLocaleDateString()}
              </Paragraph>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.section}>
        <Title>Select Time Slot</Title>
        <RadioButton.Group onValueChange={value => setSelectedTime(value)} value={selectedTime}>
          {timeSlots[selectedDate].map((slot) => (
            <View key={slot.id} style={styles.timeOption}>
              <RadioButton value={slot.id} />
              <Paragraph>{slot.time}</Paragraph>
            </View>
          ))}
        </RadioButton.Group>
      </View>

      <View style={styles.section}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>Pickup Location</Title>
            <Paragraph>Main Store</Paragraph>
            <Paragraph>123 Shopping Street</Paragraph>
            <Paragraph>New York, NY 10001</Paragraph>
            <Paragraph style={styles.phone}>Phone: (555) 123-4567</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          disabled={!selectedTime}
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
  dateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateContent: {
    marginLeft: 10,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoCard: {
    marginTop: 10,
  },
  phone: {
    marginTop: 10,
    color: '#666',
  },
  button: {
    marginTop: 20,
    padding: 5,
  },
});

export default PickupTimeScreen; 