import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages()
    }, [])

    const [allmessages, setallmessages] = useState([])
    const fetchMessages = () => {
        const chat = {
            username: route.params.user,
            sitter: route.params.sitter
        }
        axios.post('http://localhost:3000/chat/getMessages', chat)
            .then(res => {
                setallmessages(res.data[0].messages.reverse())
            })
            .catch(err => console.log(err))
    }

    const [textMessage, settextMessage] = useState('')

    const handleSend = () => {
        const messagePost = {
            sender: route.params.user,
            receiver: route.params.sitter,
            message: textMessage
        }
        axios.post('http://localhost:3000/chat/addMessage', messagePost)
            .then(res => {
                setallmessages(res.data[0].messages.reverse())
            })
            .catch(err => console.log(err))
        settextMessage('')
    }

    const handleText = (value) => {
        settextMessage(value)
    }

    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                data={allmessages}
                inverted={1}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={item.sender == route.params.user?styles.userView:styles.senderView}>
                        <Text style={styles.messageText}>{item.messageBody}</Text>
                    </View>

                )} />
            <View style={styles.bottomView}>
                <TextInput style={styles.messageinput} onChangeText={handleText} value={textMessage} />
                <TouchableOpacity style={styles.btn} onPress={handleSend}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }, messageinput: {
        width: 280,
        borderWidth: 1,
        borderColor: 'gray'
    },
    bottomView: {
        padding: 20,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    }, btn: {
        textAlign: 'center',
        backgroundColor: '#52b69a',
        width: 60,
        padding: 7,
        marginLeft: 10,
    }, userView: {
        backgroundColor: '#2978b5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft:90
    }, messageText: {
        color: 'white',
        fontSize: 17
    }, list: {
        // position:'absolute',
        bottom: 50
    },senderView:{
        backgroundColor:'#5aa897',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginRight:90
    }
})

export default ChatScreen
