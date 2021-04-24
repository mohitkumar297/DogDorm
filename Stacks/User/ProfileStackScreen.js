import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/User/LoginScreen'
import SignupScreen from '../../Screens/User/SignupScreen'
import ProfileScreen from '../../Screens/User/ProfileScreen'

const ProfileStack = createStackNavigator()
const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#5eaaa8'
          }, headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <ProfileStack.Screen name="Login" component={LoginScreen} />
          <ProfileStack.Screen name="Signup" component={SignupScreen} />
           <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        </ProfileStack.Navigator>
      );
}

export default ProfileStackScreen
