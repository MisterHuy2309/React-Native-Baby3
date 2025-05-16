import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import TabNavigator from './navigation/TabNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App; 