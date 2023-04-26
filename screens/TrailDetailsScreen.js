import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrailDetailsScreen = ({ route }) => {
  const trail = route.params?.trail || {
    name: 'No trail selected',
    location: 'Please go back and select a trail',
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trail.name}</Text>
      <Text>{trail.location}</Text>
      {/* Add any other trail details you want to display */}
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
