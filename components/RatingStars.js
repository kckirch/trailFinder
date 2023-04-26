import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      <Text style={styles.stars}>{'★'.repeat(Math.round(rating))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stars: {
    fontSize: 16,
    color: '#f1c40f',
  },
});

export default RatingStars;
