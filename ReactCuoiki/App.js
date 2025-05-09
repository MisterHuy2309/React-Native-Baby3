import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider, useCart } from './context/CartContext';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

// Import screens
import CheckoutAssistanceScreen from './screens/CheckoutAssistanceScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import ItemsScreen from './screens/ItemsScreen';
import LoginScreen from './screens/LoginScreen';
import MessagesScreen from './screens/MessagesScreen';
import PickupTimeScreen from './screens/PickupTimeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SavedItemsScreen from './screens/SavedItemsScreen';
import SearchScreen from './screens/SearchScreen';
import SelectFeaturesScreen from './screens/SelectFeaturesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CartButton = ({ navigation }) => {
  const { getCartCount } = useCart();
  return (
    <IconButton
      icon="cart"
      size={24}
      onPress={() => navigation.navigate('Cart')}
      badge={getCartCount()}
    />
  );
};

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
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
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  title: 'Gấu Bông Shop',
                  headerRight: () => <CartButton navigation={navigation} />,
                })}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ navigation }) => ({
                  title: 'Chi tiết sản phẩm',
                  headerRight: () => <CartButton navigation={navigation} />,
                })}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="MainApp" 
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetailsScreen}
                options={{ title: 'Product Details' }}
              />
              <Stack.Screen 
                name="Search" 
                component={SearchScreen}
                options={{ title: 'Search' }}
              />
              <Stack.Screen 
                name="SavedItems" 
                component={SavedItemsScreen}
                options={{ title: 'Saved Items' }}
              />
              <Stack.Screen 
                name="SelectFeatures" 
                component={SelectFeaturesScreen}
                options={{ title: 'Select Features' }}
              />
              <Stack.Screen 
                name="Cart" 
                component={CartScreen}
                options={{
                  title: 'Giỏ hàng',
                }}
              />
              <Stack.Screen 
                name="CheckoutAssistance" 
                component={CheckoutAssistanceScreen}
                options={{ title: 'Delivery Options' }}
              />
              <Stack.Screen 
                name="PickupTime" 
                component={PickupTimeScreen}
                options={{ title: 'Select Pickup Time' }}
              />
              <Stack.Screen 
                name="Checkout" 
                component={CheckoutScreen}
                options={{ title: 'Checkout' }}
              />
              <Stack.Screen 
                name="Confirmation" 
                component={ConfirmationScreen}
                options={{ title: 'Order Confirmation' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 