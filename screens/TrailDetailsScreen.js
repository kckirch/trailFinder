import React from 'react';
import { View, Text, Image, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';




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

  const sections = [
    { title: 'Location', data: [`${trail.city ? `City: ${trail.city}` : ''}`, `${trail.country ? `Country: ${trail.country}` : ''}`, `${trail.region ? `Region: ${trail.region}` : ''}`] },
    { title: 'Trail Details', data: [`${trail.difficulty ? `Difficulty: ${trail.difficulty}` : ''}`, `${trail.length ? `Length: ${trail.length} miles` : ''}`,
      trail.rating ? `Rating: ${trail.rating}` : null, `${trail.features ? `Features: ${trail.features}` : ''}`] },
    { title: 'Description', data: [`${trail.description ? trail.description : ''}`] },
    { title: 'Directions', data: [`${trail.directions ? trail.directions : ''}`] },
  ];

  const [isFavorited, setIsFavorited] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trail.name}</Text>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Icon
          name={isFavorited ? 'star' : 'star-o'}
          size={30}
          color={isFavorited ? 'gold' : 'gray'}
        />
    </TouchableOpacity>
      <Image source={{ uri: trail.thumbnail }} style={styles.image} />
      <SectionList
        sections={sections}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    color: 'black',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  
});

export default TrailDetailsScreen;
