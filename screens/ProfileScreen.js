import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Button, List, Avatar, Divider } from 'react-native-paper';
import { updateProfile } from '../services/api';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
  });

  const menuItems = [
    {
      title: 'Saved Items',
      icon: 'heart',
      onPress: () => navigation.navigate('SavedItems'),
    },
    {
      title: 'Order History',
      icon: 'history',
      onPress: () => {
        // Navigate to order history
      },
    },
    {
      title: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => {
        // Navigate to payment methods
      },
    },
    {
      title: 'Addresses',
      icon: 'map-marker',
      onPress: () => {
        // Navigate to addresses
      },
    },
    {
      title: 'Settings',
      icon: 'cog',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Button
          mode="outlined"
          onPress={() => {
            // Handle edit profile
          }}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <List.Item
          title="Phone"
          description={user.phone}
          left={props => <List.Icon {...props} icon="phone" />}
        />
        <List.Item
          title="Address"
          description={user.address}
          left={props => <List.Icon {...props} icon="map-marker" />}
        />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            left={props => <List.Icon {...props} icon={item.icon} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={item.onPress}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={() => {
            // Handle logout
          }}
          style={styles.logoutButton}
        >
          Logout
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
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    width: 120,
  },
  divider: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#FF3B30',
  },
});

export default ProfileScreen; 