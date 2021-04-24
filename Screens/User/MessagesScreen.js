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


const MessagesScreen = ({navigation}) => {
    useFocusEffect(
        React.useCallback(() => {
            fetchMessages()
        }, [])
    );

    const [isLoggedin, setisLoggedin] = useState(false)
    const [allRequests, setallRequests] = useState([])

    const fetchMessages = () => {
        axios.get('http://localhost:3000/users/checkIfAuthenticated')
            .then(res => {
                if (res.data == 'No') {
                    setisLoggedin(false)
                } else {
                    const user = {
                        username: res.data
                    }

                    axios.post('http://localhost:3000/request/getRequests', user)
                        .then(res => {
                            setallRequests(res.data)
                            // console.log(res.data);
                        })
                        .catch(err => console.log(err))
                    setisLoggedin(true)
                    console.log('here');
                }
            }).catch(err => console.log(err))
    }
    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');

        return b64
    }
    return (
        <Container>
            <FlatList
                data={allRequests}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <Card onPress={()=>{navigation.navigate('ChatScreen', item)}}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{ uri: "data:image/png;base64, " + decodeBase64(item.profileImage.data.data) }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.fullName}</UserName>
                                </UserInfoText>
                                <MessageText>{item.message}</MessageText>
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

export default MessagesScreen
// <TouchableOpacity style={styles.listView}>
                    //     <View style={{marginRight:10}}>
                    //         <Image style={styles.img} source={{ uri: "data:image/png;base64, " + decodeBase64(item.profileImage.data.data) }} />
                    //     </View>
                    //     <View>
                    //         <Text style={{ fontSize: 19 }}>{item.fullName}</Text>
                    //         <Text style={{ fontSize: 16 }}>{item.message}</Text>
                    //     </View>

                    // </TouchableOpacity>