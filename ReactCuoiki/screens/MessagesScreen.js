import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Divider, List, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const insets = useSafeAreaInsets();

  // Mock data - replace with actual data from your API
  const messages = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'The product looks great!',
      time: 'Yesterday',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'Thanks for your help!',
      time: '2 days ago',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage}
      left={props => <Avatar.Image {...props} source={{ uri: item.avatar }} />}
      right={props => <List.Subheader {...props}>{item.time}</List.Subheader>}
      onPress={() => {/* TODO: Navigate to chat screen */}}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search messages..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 0,
  },
});

export default MessagesScreen; 