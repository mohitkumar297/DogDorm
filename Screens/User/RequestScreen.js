import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';

const RequestScreen = () => {
    useFocusEffect(
        React.useCallback(() => {
            fetchRequests()
        }, [])
    );

    const [isLoggedin, setisLoggedin] = useState(false)
    const [allRequests, setallRequests] = useState([])

    const fetchRequests = () => {
        axios.get('http://localhost:3000/users/checkIfAuthenticated')
            .then(res => {
                if (res.data == 'No') {
                    setisLoggedin(false)
                } else {
                    const user = {
                        username:res.data
                    }
                    axios.post('http://localhost:3000/request/getRequests', user)
                    .then(res=>setallRequests(res.data))
                    .catch(err=>console.log(err))
                    setisLoggedin(true)
                    console.log('here');
                }
            }).catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            {!isLoggedin ? <Text>Log In to see requests</Text> :
                <View>
            <Text style={styles.headingText}>Your Requests</Text>
             <FlatList 
             style={{marginBottom:30}}
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
             /></View>}
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
        backgroundColor:'#52b69a',
        marginVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'gray',
    },listText:{
        fontSize:18,
        padding:10,
        color:'white'
    }
})
export default RequestScreen
