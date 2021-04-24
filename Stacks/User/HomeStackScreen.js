import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/User/HomeScreen'
import ViewSitterScreen from '../../Screens/User/ViewSitterScreen'
import ContactSitter from '../../Screens/User/ContactSitter'
import ConfirmSitter from '../../Screens/User/ConfirmSitter'

const HomeStack = createStackNavigator()
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#5eaaa8'
          }, headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <HomeStack.Screen name="Home" component={HomeScreen} />
           <HomeStack.Screen name="ViewSitter" component={ViewSitterScreen} />
          <HomeStack.Screen name="ContactSitter" component={ContactSitter} />
          <HomeStack.Screen name="ConfirmSitter" component={ConfirmSitter} />
    
        </HomeStack.Navigator>
      );
}

export default HomeStackScreen
