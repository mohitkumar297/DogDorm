import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginSitterScreen from '../Screens/Sitter/LoginSitterScreen'
import RegisterSitterScreen from '../Screens/Sitter/RegisterSitterScreen'
import SitterProfileScreen from '../Screens/Sitter/SitterProfileScreen'

const ProfileStack = createStackNavigator()

const SitterProfileStack = () => {
    return (
        <ProfileStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#5eaaa8'
          }, headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <ProfileStack.Screen name="LoginSitter" component={LoginSitterScreen} />
           <ProfileStack.Screen name="SignupSitter" component={RegisterSitterScreen} />
          <ProfileStack.Screen name="SitterProfile" component={SitterProfileScreen} />
        </ProfileStack.Navigator>
      );
}

export default SitterProfileStack
