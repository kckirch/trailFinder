import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import TrailCard from '../components/TrailCard';
//import api from '../services/api';

const HomeScreen = ({ navigation }) => {
  // const [trails, setTrails] = useState([]);

  // useEffect(() => {
  //   fetchTrails();
  // }, []);

  // const fetchTrails = async () => {
  //   const response = await api.get('/trails');
  //   setTrails(response.data);
  // };

  return (
    <View style={styles.container}>
      <Text>The api will call here to display some nearby hikes</Text>
      <FlatList
        // data={trails}
        // renderItem={({ item }) => (
        //   <TrailCard
        //     trail={item}
        //     onPress={() => navigation.navigate('TrailDetails', { trail: item })}
        //   />
        // )}
        // keyExtractor={(item) => item.id.toString()}
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
