import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

const TrailDetailsScreen = ({ route }) => {
  const trail = route.params?.trail || {
    name: 'No trail selected',
    location: 'Please go back and select a trail',
  };

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.navigate('Home')}
          tintColor="black"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trail.name}</Text>
      <Image source={{ uri: trail.thumbnail }} style={styles.image} />
      <Text>{trail.location}</Text>
      <Text>Difficulty: {trail.difficulty}</Text>
      <Text>Length: {trail.length} miles</Text>
      <Text>Ascent: {trail.ascent} feet</Text>
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});

export default TrailDetailsScreen;
