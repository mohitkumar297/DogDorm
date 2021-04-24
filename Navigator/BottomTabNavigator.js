import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from '../Stacks/User/HomeStackScreen'
import ProfileStackScreen from '../Stacks/User/ProfileStackScreen'
import MessagesStackScreen from '../Stacks/User/MessagesStackScreen'
import RequestStackScreen from '../Stacks/User/RequestStackScreen'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused
            ? 'person'
            : 'person-outline';
        }
        else if (route.name === 'Messages') {
          iconName = focused
            ? 'chatbubbles-sharp'
            : 'chatbubbles-outline';
        }
        else if (route.name === 'Request') {
          iconName = focused
            ? 'document-text'
            : 'document-text-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: '#2EC4B6',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Request" component={RequestStackScreen} />
      <Tab.Screen name="Messages" component={MessagesStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator
