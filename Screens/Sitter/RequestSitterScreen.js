import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const RequestScreen = () => {
    useFocusEffect(
        React.useCallback(() => {
            checkIfLoggedIn()
        }, [])
    );

    const [isLoggedin, setisLoggedin] = useState(false)
    const [sitter, setsitter] = useState('')
    const [allRequests, setallRequests] = useState([])

    const checkIfLoggedIn = async () => {
        console.log('kin');
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            if (username !== null && password !== null) {
                setisLoggedin(true)
                setsitter(username)
                const body = {
                    sitter:username
                }
                console.log('send');
                axios.post('http://localhost:3000/request/getRequestsToSitters', body)
                .then(res=>setallRequests(res.data))
                .catch(err=>console.log(err))

            } else {
                setisLoggedin(false)
            }


        } catch (e) {
            console.log('err is ' + e);
        }
    }


    return (
        <View>
            {isLoggedin ? <View>
            <Text style={styles.headingText}>Your Requests</Text>
             <FlatList 
                 data={allRequests}
                 keyExtractor={(item,index)=>item._id}
                 renderItem={({item})=>(
                     <View style={styles.listView}>
                     <Text style={styles.listText}>Sitter Name : {item.fullName}</Text>
                     <Text style={styles.listText}>Booked on : {item.dateBooked}</Text>
                     <Text style={styles.listText}>Booked for days : {item.numberOfDays}</Text>
                     <Text style={styles.listText}>Total Bill : ${item.numberOfDays*item.charges}</Text>
                     </View>
                 )}
             /></View> : <Text style={{fontSize:20, alignSelf:'center', marginTop:150}}>You're not Logged In</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        // alignItems:'center'
    },
    headingText:{
        fontSize:18,
    },
    listView:{
        backgroundColor:'#ca8a8b',
        marginVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },listText:{
        fontSize:18,
        padding:10,
        color:'white'
    }
})

export default RequestScreen
