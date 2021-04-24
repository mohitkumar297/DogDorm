import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Button from '../../Component/Button'
import CalendarPicker from 'react-native-calendar-picker';
import { log } from 'react-native-reanimated';
import axios from 'axios'


const ContactSitter = ({ route, navigation }) => {
    useEffect(() => {
        console.log(route.params.fullName);
    }, [])

    const [dateBooked, setdateBooked] = useState(null)
    const [bill, setbill] = useState('')
    const [numberOfDays, setnumberOfDays] = useState(1)
    const [message, setmessage] = useState('')

    const onDateChange = (date) => {
        setdateBooked(new Date(date).toDateString())
    }

    const [datePressed, setdatePressed] = useState('')

    // const setBill = () => {
    //     console.log(numberOfDays);
    //     // console.log(Number(numberOfDays)*route.params.charges)
    // }
    const handleChange = (value) => {
        setnumberOfDays(value)
    }
    const handleMessageChange = (value) => {

        setmessage(value)
    }

    const handleClick = () => {
        axios.get('http://localhost:3000/users/checkIfAuthenticated')
            .then(res => {
                if (res.data == 'No') {
                    Alert.alert("You're not logged in")
                } else {
                    const request = {
                        sitter: route.params.username,
                        charges: route.params.charges,
                        dateBooked: dateBooked,
                        message: message,
                        numberOfDays: numberOfDays,
                        fullName: route.params.fullName,
                        username:res.data,
                        profileImage:{
                            contentType:route.params.profileImage.contentType,
                            data:route.params.profileImage.data
                    }
                }
                    // console.log(request);
                    axios.post('http://localhost:3000/request/addRequest', request)
                        .then(res => {
                            
                            // setallsitters(res.data)
                        })
                        .catch(err => console.log(err))


                    navigation.navigate('ConfirmSitter', request)
                }
            })
            .catch(err => console.log(err))

console.log('l');

    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18 }}>Select a Date </Text>

            <CalendarPicker
                onDateChange={onDateChange}
            />
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    marginBottom: 20
                }}
            />
            <View style={styles.billContainer}>
                <Text>Number of days </Text>
                <TextInput style={styles.daysNumber} onChangeText={handleChange} />
            </View>

            <TextInput
                style={styles.messageArea} Ï
                multiline={true}
                numberOfLines={4}
                placeholder='Write a message'
                onChangeText={handleMessageChange}
            />
            <Button btnText='Send' btnClick={handleClick} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    messageArea: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        height: 150
    }, billContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }, daysNumber: {
        backgroundColor: 'white',
        width: 80,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 1
    }
})

export default ContactSitter
