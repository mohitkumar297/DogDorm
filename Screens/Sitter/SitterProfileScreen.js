import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {Buffer} from 'buffer'

const SitterProfile = ({ navigation }) => {
    useEffect(() => {
        getData()
    }, [])
    const [sitter, setsitter] = useState('')

    const getData = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            if (username !== null && password !== null) {
                const body = {
                    username: username
                }
                axios.post('http://localhost:3000/sitters/getSitter', body)
                    .then(res => {
                        setsitter(res.data)
                    })
                    .catch(err => console.log(err))
            }
        } catch (e) {
            console.log('err is ' + e);
        }
    }
    const logout = async (value) => {
        try {
            await AsyncStorage.setItem('username', '')
            await AsyncStorage.setItem('password', '')

        } catch (e) {
            // saving error
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginSitter' }],
        });
    }
    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');

        return b64
    }
    return (
        <View style={styles.container}>
        {sitter != '' ? <Image style={{width:100,height:100, alignSelf:'center', marginBottom:20}} source={{ uri: "data:image/png;base64, " + decodeBase64(sitter.profileImage.data.data) }} />:<Image style={{width:100,height:100}} source={require('../../assets/avatar.png')} />}
            <Text style={styles.textView}>Full Name : {sitter.fullName}</Text>
            <Text style={styles.textView}>User Name : {sitter.username}</Text>
            <Text style={styles.textView}>Charges per day : ${sitter.charges}</Text>
            <Text style={styles.textView}>Preference : {sitter.preferenceOfDogs}</Text>
            <Text style={styles.textView}>Location : {sitter.location}</Text>
            <Text style={styles.textView}>Experience : {sitter.experience}</Text>
            <TouchableOpacity style={{ backgroundColor: '#9dbeb9', padding: 15, alignSelf:'stretch', marginVertical:50 }} onPress={logout}>
                <Text style={{fontSize:18, color:'red'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        alignItems:'flex-start'
    },textView:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
        backgroundColor:'#9dbeb9',
        alignSelf:'stretch',
        padding:15,
        color: 'white',
        borderRadius:10
    }
})
export default SitterProfile
