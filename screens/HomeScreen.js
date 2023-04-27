import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TrailCard from '../components/TrailCard';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
//import api from '../services/api';

Geocoder.init('AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA');

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [trails, setTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);

  const fetchTrail = async (trailId) => {
    try {
      const apiKey = '577e3d15b9msh3ffe98e39aa7cc0p138d71jsna5351c9b8a88';
      const url = `https://trailapi-trailapi.p.rapidapi.com/trails/${trailId}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
        },
      });
  
      const data = await response.json();
      console.log('API response:', data);
  
      if (data) {
        // Do something with the trail data
      } else {
        console.error('Error fetching trail: Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching trail:', error);
    }
  };
  

  useEffect(() => {
    fetchTrails();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
  
      const currentLocation = await Location.getCurrentPositionAsync({});
      const result = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
  
      if (result[0] && result[0].city) {
        setCity(result[0].city);
      }
  
      fetchTrails(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, []);
  

  useEffect(() => {
    const filtered = trails.filter((trail) =>
      trail.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrails(filtered);
  }, [search, trails]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for trails..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
      />

      {city && <Text>Current location: {city}</Text>}

      <FlatList
        data={filteredTrails}
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
});

export default HomeScreen;
