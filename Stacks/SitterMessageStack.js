import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MessageSitterScreen from '../Screens/Sitter/MessagesSitterScreen'
import SitterChatScreen from '../Screens/Sitter/SitterChatScreen'

const MessageStack = createStackNavigator()

const MessageStackScreen = () => {
    return (
        <MessageStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#5eaaa8'
          }, headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <MessageStack.Screen name="Message" component={MessageSitterScreen} />
           <MessageStack.Screen name="Chat" component={SitterChatScreen} />
           {/*<ProfileStack.Screen name="Profile" component={ProfileScreen} /> */}
        </MessageStack.Navigator>
      );
}

export default MessageStackScreen
