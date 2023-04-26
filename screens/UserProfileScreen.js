import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';




Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");

const UserProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    location: {
      latitude: null,
      longitude: null,
      address: null,
    },
    
  });

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isLocationEditable, setIsLocationEditable] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const defaultData = {
      name: '',
      email: '',
      location: {
        latitude: null,
        longitude: null,
        address: null,
      },
      
    };

    const fetchUserData = async () => {
      const storedUserData = JSON.parse(await AsyncStorage.getItem('userProfile'));
      setUserData((prevState) => ({
        ...prevState,
        name: storedUserData.name || '',
        email: storedUserData.email || '',
        location: {
          latitude: prevState.location.latitude || storedUserData.location.latitude,
          longitude: prevState.location.longitude || storedUserData.location.longitude,
          address: storedUserData.location.address || '',
        },
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

  const handleEditLocation = useCallback(() => {
    setIsLocationEditable(true);
  }, []);

  const handleSaveProfile = useCallback(async () => {
    setIsNameEditable(false);
    setIsEmailEditable(false);
    setIsLocationEditable(false);
    const storedUserData = JSON.parse(await AsyncStorage.getItem('userProfile'));
    setUserData((prevState) => ({
      ...prevState,
      name: userData.name,
      email: userData.email,
      location: {
        ...prevState.location,
        latitude: userData.location.latitude,
        longitude: userData.location.longitude,
        address: address || prevState.location.address,
      },
    }));
    await AsyncStorage.setItem(
      'userProfile',
      JSON.stringify({
        ...storedUserData,
        name: userData.name,
        email: userData.email,
        location: {
          ...storedUserData.location,
          latitude: userData.location.latitude,
          longitude: userData.location.longitude,
          address: address || storedUserData.location.address,
        },
      }),
    );
  }, [address, userData]);
  

  const handleNameChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, name: text }));
  }, []);

  const handleEmailChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, email: text }));
  }, []);

  const handleAddressChange = useCallback((text) => {
    setAddress(text);
  }, []);

  const handleLocationChange = useCallback(
    
    async (location) => {
      console.log('address:', address);
      try {
        const res = await Geocoder.from(location.latitude, location.longitude);
        const address = res.results[0].formatted_address;
        setUserData((prevState) => ({
          ...prevState,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            address,
          },
        }));
      } catch (error) {
      console.log(error);
    }
  }, []);
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userData?.location?.latitude || 37.78825,
            longitude: userData?.location?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
          onPress={(event) => handleLocationChange(event.nativeEvent.coordinate)}
        >
          {userData.location.latitude && userData.location.longitude && (
        <Marker
          coordinate={{ latitude: userData.location.latitude, longitude: userData.location.longitude }}
          title="Your Location"
        />
      )}
        </MapView>
        </View>


      
      <Text style={styles.name}>{userData.name || 'Guest User'}</Text>
      <Text style={styles.email}>{userData.email}</Text>




      {/* this needs {userData.location.latitude && userData.location.longitude &&( still*/}
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>Your Location:</Text>
        <Text style={styles.locationText}>Latitude: {userData.location.latitude}</Text>
        <Text style={styles.locationText}>Longitude: {userData.location.longitude}</Text>
        <Text style={styles.locationText}>Address: {userData.location.address}</Text>
      </View>
      
      


      
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Name</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditEmail}>
        <Text style={styles.buttonText}>Edit Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditLocation}>
        <Text style={styles.buttonText}>Edit Location</Text>
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

      <Modal animationType="slide" transparent={false} visible={isLocationEditable}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Location</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={handleAddressChange}
            value={address}
            placeholder="Enter your location"
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
