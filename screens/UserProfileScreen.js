import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const UserProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    location: {
      latitude: null,
      longitude: null,
    },
    
  });

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isLocationEditable, setIsLocationEditable] = useState(false);

  useEffect(() => {
    const defaultData = {
      name: '',
      email: 'johndoe@example.com',
      location: {
        latitude: null,
        longitude: null,
      },
      
    };

    const fetchUserData = async () => {
      // ... Previous fetchUserData function
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
      name: storedUserData.name || '',
      email: storedUserData.email || '',
      location: {
        latitude: prevState.location.latitude || storedUserData.location.latitude,
        longitude: prevState.location.longitude || storedUserData.location.longitude,
      },
    }));
    await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
  }, [userData]);
  

  const handleNameChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, name: text }));
  }, []);

  const handleEmailChange = useCallback((text) => {
    setUserData((prevState) => ({ ...prevState, email: text }));
  }, []);

  const handleLocationChange = useCallback((newLocation) => {
    setUserData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        ...newLocation,
      },
    }));
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

      {userData.location.latitude && userData.location.longitude && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Your Location:</Text>
          <Text style={styles.locationText}>Latitude: {userData.location.latitude}</Text>
          <Text style={styles.locationText}>Longitude: {userData.location.longitude}</Text>
        </View>
      )}
      
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
            onChangeText={(text) => handleLocationChange({ ...userData.location, latitude: parseFloat(text) })}
            value={userData.location.latitude?.toString()}
            placeholder="Enter your latitude"
            keyboardType="decimal-pad"
          />
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => handleLocationChange({ ...userData.location, longitude: parseFloat(text) })}
            value={userData.location.longitude?.toString()}
            placeholder="Enter your longitude"
            keyboardType="decimal-pad"
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
