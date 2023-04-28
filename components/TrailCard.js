import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import RatingStars from './RatingStars';

const TrailCard = ({ trail }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: trail.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{trail.name}</Text>
        <Text style={styles.location}>{trail.location}</Text>
        <RatingStars rating={trail.rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
});

export default TrailCard;
