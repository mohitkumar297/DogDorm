import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestStackScreen from '../Stacks/RequestStackScreen'
import SitterProfileStack from '../Stacks/SitterProfileStack'
import MessageStackScreen from '../Stacks/SitterMessageStack'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const SitterBottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Request') {
          iconName = focused
            ? 'document-text'
            : 'document-text-outline';
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

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: '#2EC4B6',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Request" component={RequestStackScreen} />
      <Tab.Screen name="Messages" component={MessageStackScreen} />
      <Tab.Screen name="Profile" component={SitterProfileStack} />


    </Tab.Navigator>
  )
}

export default SitterBottomTabNavigator
