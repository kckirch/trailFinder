import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TrailCard from '../components/TrailCard';
//import api from '../services/api';

const HomeScreen = ({ navigation }) => {
  // Hardcoded trails for testing purposes
  const exampleTrails = [
    {
      id: 1,
      name: 'Example Trail 1',
      location: 'Example Location 1',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1586477572631-c0663f9a03dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 2,
      name: 'Example Trail 2',
      location: 'Example Location 2',
      rating: 3.7,
      image: 'https://images.unsplash.com/photo-1591268245679-cb25f3116aa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    },
    {
      id: 3,
      name: 'Example Trail 3',
      location: 'Example Location 3',
      rating: 4.2,
      image: 'https://plus.unsplash.com/premium_photo-1669839773667-3d7d153bc431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 4,
      name: 'Example Trail 4',
      location: 'Example Location 4',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1528226922624-a3d2fe277cf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 5,
      name: 'Example Trail 5',
      location: 'Example Location 5',
      rating: 3.1,
      image: 'https://images.unsplash.com/photo-1508497436501-3eb6e42ab87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 6,
      name: 'Example Trail 6',
      location: 'Example Location 6',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502315223283-5d624c600ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    },
    {
      id: 7,
      name: 'Example Trail 7',
      location: 'Example Location 7',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1625495194343-f2d69dae42fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    },
    {
      id: 8,
      name: 'Example Trail 8',
      location: 'Example Location 8',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1620640558738-ed5eb2bb19d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 9,
      name: 'Example Trail 9',
      location: 'Example Location 9',
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1624640901932-5be77849f43b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 10,
      name: 'Example Trail 10',
      location: 'Example Location 10',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    },


    // Add more trails if needed

  ];

  return (
    <View style={styles.container}>
      <Text>Maybe we should Add like current location here?</Text>
      <FlatList
        data={exampleTrails}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TrailDetails', { trail: item })}>
            <TrailCard trail={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
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
