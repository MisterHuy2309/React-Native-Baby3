import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import CartScreen from './cart';
import Home from './Home';
import { StyleSheet } from 'react-native';
import HTKH from './HTKH';
import SaveItem from './SaveItem';  
import { io } from 'socket.io-client';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#828282',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Tab.Screen name="GauBong" component={Home} options={{ title: 'Gấu Bông' }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ Hàng' }} />
        <Tab.Screen name="HTKH" component={HTKH} options={{ title: 'Hỗ Trợ Khách Hàng' }} />
        <Tab.Screen name="SaveItem" component={SaveItem} options={{ title: 'Lưu Thông Tin' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#6200ee',
    height: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
