import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import InputText from '../../Component/InputText'
import Button from '../../Component/Button'
import AppLogo from '../../Component/AppLogo'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSitterScreen = ({ navigation }) => {
    useEffect(() => {
        checkIfLoggedIn()
    }, [])

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const usernameChange = (value) => {
        setusername(value)
    }

    const passwordChange = (value) => {
        setpassword(value)
    }


    const checkIfLoggedIn = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            if (username !== null && password !== null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SitterProfile' }],
                });
            }
        } catch (e) {
            console.log('err is ' + e);
        }
    }



    const persistLogin = async (value) => {
        try {
            await AsyncStorage.setItem('username', value.username)
            await AsyncStorage.setItem('password', value.password)
        } catch (e) {
            // saving error
        }
    }


    const handeClick = (btnClick) => {
        if (btnClick === 'Register') {
            navigation.navigate('SignupSitter')
        }
        else if (btnClick === 'Login') {
            if (username === '' || password === '') {
                Alert.alert('Please Enter both fields')
            } else {
                const user = {
                    username: username,
                    password: password
                }
                axios.post('http://localhost:3000/sitters/login', user)
                    .then(res => {
                        if (res.data === 'Right Password') {
                            persistLogin(user)
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SitterProfile' }],
                            });
                        } else {
                            Alert.alert('Wrong Credentials')
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text>Sitter login</Text> */}
            <AppLogo />
            <InputText placeholder='Enter Username' textChange={usernameChange} />
            <InputText secureEntry={true}
                placeholder="Enter Password"
                textChange={passwordChange}
            />
            <Button btnClick={handeClick} btnText='Login' />
            <Button btnClick={handeClick} btnText='Register' />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
})

export default LoginSitterScreen
