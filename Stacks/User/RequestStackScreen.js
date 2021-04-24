import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import RequestScreen from '../../Screens/User/RequestScreen'
const RequestStack = createStackNavigator()
const RequestStackScreen = () => {
    return (
        <RequestStack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#5eaaa8'
            }, headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}>
            <RequestStack.Screen name="Request" component={RequestScreen} />
             {/*<MessageStack.Screen name="ViewSitter" component={ViewSitterScreen} />
            <HomeStack.Screen name="Cities" component={CitiesScreen} /> */}
      
          </RequestStack.Navigator>
    )
}

export default RequestStackScreen
