import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrailDetailsScreen = ({ route }) => {
  // const { trail } = route.params;

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>{"Trail Name"}</Text>
      <Text>{"Trail desc"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TrailDetailsScreen;
