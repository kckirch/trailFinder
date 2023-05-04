import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import TrailCard from '../components/TrailCard';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import * as SQLite from 'expo-sqlite';

Geocoder.init('AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA');

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [trails, setTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const db = SQLite.openDatabase('trails.db');
  
  const initDB = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS trails (url TEXT PRIMARY KEY, data TEXT, timestamp INTEGER);',
        [],
        () => console.log('Table created/checked successfully'),
        (_, error) => console.log('Error creating/checking table:', error)
      );
    });
  };
  
  initDB();
  
  const fetchTrails = async (latitude, longitude, radius = 25, limit = 10) => {
    try {
      const apiKey = '577e3d15b9msh3ffe98e39aa7cc0p138d71jsna5351c9b8a88';
      const queryParams = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        radius: radius,
        limit: limit,
      });
      const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?${queryParams}`;
  
      const storedData = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT data FROM trails WHERE url = ?;',
            [url],
            (_, { rows }) => {
              if (rows.length) {
                resolve(rows.item(0).data);
              } else {
                resolve(null);
              }
            },
            (_, error) => {
              console.log('Error fetching stored data:', error);
              reject(error);
            }
          );
        });
      });
  
      if (storedData) {
        console.log('Returning data from SQLite:', JSON.parse(storedData));
        return JSON.parse(storedData);
      }
  
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
        // Store the trail data in SQLite
        db.transaction(tx => {
          tx.executeSql(
            'INSERT OR REPLACE INTO trails (url, data, timestamp) VALUES (?, ?, ?);',
            [url, JSON.stringify(data), Date.now()],
            () => console.log('Data stored in SQLite successfully'),
            (_, error) => console.log('Error storing data in SQLite:', error)
          );
        });
  
        // Return the trail data
        return data;
      } else {
        console.error('Error fetching trails: Invalid response format');
        return null;
      }
    } catch (error) {
      console.error('Error fetching trails:', error);
      return null;
    }
  };
  
  
  
  
  
  
  const handleLocationChange = async () => {
    setLocationModalVisible(false);
    if (newLocation) {
      try {
        const geocodeResult = await Geocoder.from(newLocation);
        if (geocodeResult.results.length > 0) {
          const { lat, lng } = geocodeResult.results[0].geometry.location;
          const trailsData = await fetchTrails(lat, lng);
          if (trailsData) {
            setTrails(trailsData.data);
            setCity(geocodeResult.results[0].formatted_address);
          }
        } else {
          alert('No results found for the entered location.');
        }
      } catch (error) {
        console.error('Error changing location:', error);
        alert('Error changing location. Please try again.');
      }
    }
    setNewLocation('');
  };


  useEffect(() => {
    (async () => {
      setIsLoading(true); // set loading indicator to true
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
  
      const trailsData = await fetchTrails(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      if (trailsData) {
        setTrails(trailsData.data);
        setIsLoading(false); // set loading indicator to false
      }
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

    {city && (
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Current location: {city}</Text>
        <Button
          title="Change location"
          onPress={() => setLocationModalVisible(true)}
        />
      </View>
    )}

    <Modal
      animationType="slide"
      transparent={true}
      visible={locationModalVisible}
      onRequestClose={() => {
        setLocationModalVisible(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter a new location:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setNewLocation}
            value={newLocation}
            placeholder="Address or city"
            placeholderTextColor="black"
          />
          <View style={styles.buttonContainer}>
            <Button title="Update location" onPress={handleLocationChange} />
            <Button
              title="Cancel"
              onPress={() => setLocationModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>


      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#4a4a4a" />
        </View>
      )}

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
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 18,
    marginRight: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  
});




export default HomeScreen;
