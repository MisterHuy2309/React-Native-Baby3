import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, List, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Mock user data - replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };

  const menuItems = [
    { title: 'Saved Items', icon: 'heart', onPress: () => navigation.navigate('SavedItems') },
    { title: 'Orders', icon: 'package', onPress: () => {/* TODO: Navigate to orders */} },
    { title: 'Settings', icon: 'cog', onPress: () => {/* TODO: Navigate to settings */} },
    { title: 'Help & Support', icon: 'help-circle', onPress: () => {/* TODO: Navigate to help */} },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <Title style={styles.name}>{user.name}</Title>
          <Title style={styles.email}>{user.email}</Title>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <List.Item
                title={item.title}
                left={props => <List.Icon {...props} icon={item.icon} />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={item.onPress}
              />
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => {/* TODO: Implement logout */}}
            style={styles.logoutButton}
          >
            Logout
          </Button>
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
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  logoutButton: {
    borderColor: '#ff4444',
  },
});

export default ProfileScreen; 