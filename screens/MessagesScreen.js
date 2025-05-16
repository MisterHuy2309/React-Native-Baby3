import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Avatar, Searchbar, Divider } from 'react-native-paper';

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'Customer Support',
      lastMessage: 'How can I help you today?',
      time: '10:30 AM',
      unread: 2,
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      name: 'Order #12345',
      lastMessage: 'Your order has been shipped',
      time: 'Yesterday',
      unread: 0,
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: '3',
      name: 'Product Inquiry',
      lastMessage: 'Thank you for your question',
      time: '2 days ago',
      unread: 0,
      avatar: 'https://via.placeholder.com/50',
    },
  ]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => {
        // Navigate to chat detail
      }}
    >
      <Avatar.Image
        size={50}
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text
            style={[
              styles.lastMessage,
              item.unread > 0 && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search messages..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  chatList: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: '#000',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
});

export default MessagesScreen; 