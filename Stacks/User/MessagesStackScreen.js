import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../../Screens/User/MessagesScreen'
import ChatScreen from '../../Screens/User/ChatScreen'

const MessageStack = createStackNavigator()
const MessagesStackScreen = () => {
    return (
        <MessageStack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#5eaaa8'
            }, headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}>
            <MessageStack.Screen name="Message" component={MessagesScreen} />
            <MessageStack.Screen name="ChatScreen" component={ChatScreen} options={({route})=>({
              title:route.params.fullName,
              headerBackTitleVisible:false
            })}/>
             {/*<HomeStack.Screen name="Cities" component={CitiesScreen} /> */}
      
          </MessageStack.Navigator>
    )
}

export default MessagesStackScreen
