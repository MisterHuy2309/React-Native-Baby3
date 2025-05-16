import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import SavedItemsScreen from '../screens/SavedItemsScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen 
        name="SavedItems" 
        component={SavedItemsScreen}
        options={{ title: 'Saved Items' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack; 