import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Explore Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
