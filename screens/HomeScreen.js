import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TrailCard from '../components/TrailCard';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
//import api from '../services/api';


const HomeScreen = ({ navigation }) => {

  Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

  // Hardcoded trails for testing purposes
  const exampleTrails = [
    {
      id: 1,
      name: 'Angels Landing',
      location: 'Zion National Park, Utah',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1586477572631-c0663f9a03dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 2,
      name: 'Half Dome',
      location: 'Yosemite National Park, California',
      rating: 3.7,
      image: 'https://images.unsplash.com/photo-1591268245679-cb25f3116aa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    },
    {
      id: 3,
      name: 'John Muir Trail',
      location: 'Yosemite National Park, California',
      rating: 4.2,
      image: 'https://plus.unsplash.com/premium_photo-1669839773667-3d7d153bc431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 4,
      name: 'Appalachian Trail',
      location: 'Eastern United States',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1528226922624-a3d2fe277cf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 5,
      name: 'Pacific Crest Trail',
      location: 'Western United States',
      rating: 3.1,
      image: 'https://images.unsplash.com/photo-1508497436501-3eb6e42ab87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 6,
      name: 'Bright Angel Trail',
      location: 'Grand Canyon National Park, Arizona',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502315223283-5d624c600ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    },
    {
      id: 7,
      name: 'Mount Marcy',
      location: 'Adirondack Mountains, New York',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1625495194343-f2d69dae42fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    },
    {
      id: 8,
      name: 'Mount Washington',
      location: 'White Mountain National Forest, New Hampshire',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1620640558738-ed5eb2bb19d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 9,
      name: 'Longs Peak',
      location: 'Rocky Mountain National Park, Colorado',
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1624640901932-5be77849f43b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 10,
      name: 'Kalalau Trail',
      location: 'Kauai, Hawaii',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    },


    // Add more trails if needed

  ];

  // useState to manage the search query
  const [search, setSearch] = useState('');




  // Function to handle search query updates
  const updateSearch = (search) => {
    setSearch(search);
  };


  return (

    <View style={styles.container}>

      {/* Add the SearchBar component */}
      <SearchBar
        placeholder="Search for trails..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />

      <Text>Maybe we should Add like current location here?</Text>
      <FlatList
        data={exampleTrails}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Trails', { trail: item })}>
            <TrailCard trail={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 10,
  },
  searchInputContainer: {
    backgroundColor: '#e6e6e6',
    borderRadius: 50,
  },
  searchInput: {
    color: '#333',
  },
});

export default HomeScreen;
