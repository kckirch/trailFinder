import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

const UserProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',

  });

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);


  const [currentCity, setCurrentCity] = useState('');
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
        setCurrentCity(result[0].city);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(await AsyncStorage.getItem('userProfile'));
      setUserData((prevState) => ({
        ...prevState,
        name: storedUserData?.name || '',
        email: storedUserData?.email || '',

      }));
    };
    fetchUserData();
  }, []);

  const handleEditProfile = useCallback(() => {
    setIsNameEditable(true);
  }, []);

  const handleEditEmail = useCallback(() => {
    setIsEmailEditable(true);
  }, []);



  const handleSaveProfile = useCallback(async () => {
    setIsNameEditable(false);
    setIsEmailEditable(false);
    const storedUserData = JSON.parse(await AsyncStorage.getItem('userProfile'));
    setUserData((prevState) => ({
      ...prevState,
      name: userData.name,
      email: userData.email,
    
    }));
    await AsyncStorage.setItem(
      'userProfile',
      JSON.stringify({
        ...storedUserData,
        name: userData.name,
        email: userData.email,
        
      }),
    );
  }, [userData]);

  const handleNameChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, name: text }));
  }, []);

  const handleEmailChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, email: text }));
  }, []);




  
  
  
  

  return (
    <View style={styles.container}>



      
      <Text style={styles.name}>{userData.name || 'Guest User'}</Text>
      <Text style={styles.email}>{userData.email}</Text>




      {/* this needs {userData.location.latitude && userData.location.longitude &&( still*/}
      <View style={styles.locationContainer}>
        {currentCity && <Text style={styles.currentCity}>Current location: {currentCity}</Text>}
      </View>
      
      


      
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Name</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditEmail}>
        <Text style={styles.buttonText}>Edit Email</Text>
      </TouchableOpacity>



      <Modal animationType="slide" transparent={false} visible={isNameEditable}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Name</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={handleNameChange}
            value={userData.name}
            placeholder="Enter your name"
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal animationType="slide" transparent={false} visible={isEmailEditable}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Email</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={handleEmailChange}
            value={userData.email}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  currentCity: {
    fontSize: 16,
    marginBottom: 10,
  },  
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b5998',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '80%',
    marginBottom: 20,
  },
});

export default UserProfileScreen;
