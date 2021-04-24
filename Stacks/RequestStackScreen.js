import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RequestSitterScreen from '../Screens/Sitter/RequestSitterScreen'

const ProfileStack = createStackNavigator()

const RequestStackScreen = () => {
    return (
        <ProfileStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#5eaaa8'
          }, headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <ProfileStack.Screen name="Requests" component={RequestSitterScreen} />
          {/* <ProfileStack.Screen name="Signup" component={SignupScreen} />
           <ProfileStack.Screen name="Profile" component={ProfileScreen} /> */}
        </ProfileStack.Navigator>
      );
}

export default RequestStackScreen
