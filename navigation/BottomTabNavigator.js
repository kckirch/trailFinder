import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import TrailDetailsScreen from '../screens/TrailDetailsScreen'; // Import TrailsScreen

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: size, color }}>
              🏠
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Trails"
        component={TrailDetailsScreen} // Add the TrailsScreen component
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: size, color }}>
              🌲
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: size, color }}>
              👤
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
