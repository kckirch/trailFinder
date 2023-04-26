import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TrailDetailsScreen from '../screens/TrailDetailsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="HomeButton" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TrailDetails" component={TrailDetailsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
