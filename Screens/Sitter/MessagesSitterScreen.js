import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'
import { Buffer } from 'buffer'
import { useFocusEffect } from '@react-navigation/native';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../../styles/MessageStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesSitterScreen = ({ navigation }) => {
    useFocusEffect(
        React.useCallback(() => {
            checkIfLoggedIn()
        }, [])
    );

    const [isLoggedin, setisLoggedin] = useState(false)
    const [allMessages, setallMessages] = useState([])

    const checkIfLoggedIn = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            if (username !== null && password !== null) {

                const body = {
                    sitter: username
                }
console.log('oan');
                axios.post('http://localhost:3000/chat/getMessagesForSitter', body)
                    .then(res => {
                        console.log(res.data);
                        setallMessages(res.data)})
                    .catch(err => console.log(err))
            }
        } catch (e) {
            console.log('err is ' + e);
        }
    }

    return (
        <Container>
            <FlatList
                data={allMessages}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <Card onPress={() => { navigation.navigate('Chat', item) }}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={require('../../assets/avatar.png')} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.username}</UserName>
                                </UserInfoText>
                                <MessageText>{item.messages[item.messages.length-1].messageBody}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>

                )}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    listView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 15
    }, img: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2
    }
})

export default MessagesSitterScreen
// <TouchableOpacity style={styles.listView}>
                    //     <View style={{marginRight:10}}>
                    //         <Image style={styles.img} source={{ uri: "data:image/png;base64, " + decodeBase64(item.profileImage.data.data) }} />
                    //     </View>
                    //     <View>
                    //         <Text style={{ fontSize: 19 }}>{item.fullName}</Text>
                    //         <Text style={{ fontSize: 16 }}>{item.message}</Text>
                    //     </View>

                    // </TouchableOpacity>