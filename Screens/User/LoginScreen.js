import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import InputText from '../../Component/InputText'
import Button from '../../Component/Button'
import AppLogo from '../../Component/AppLogo'
import axios from 'axios'


const LoginScreen = ({ navigation }) => {
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

    const checkIfLoggedIn = () =>{
        axios.get('http://localhost:3000/users/checkIfAuthenticated')
        .then(res=>{
            if(res.data == 'No'){
                console.log('Not Logged In');
            }else{
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Profile' }],
                  });
            }
        })
        .catch(err=>console.log(err))
    }
    
    const handeClick = (btnClick) => {
        if (btnClick === 'Signup') {
            navigation.navigate('Signup')
        }
        else if (btnClick === 'Login'){
            if (username === '' || password === ''){
                Alert.alert('Please Enter both fields')
            }else{
                const user = {
                    username:username,
                    password:password
                }
                axios.post('http://localhost:3000/users/login', user)
                .then(res=>
                    {
                        if(res.data === 'Success'){
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Profile' }],
                              });
                        }else{
                            Alert.alert('Incorrect Username or Password')
                        }
                    })
                .catch(err=>console.log(err))
            }
        }
    }

    return (
        <View style={styles.container}>
            <AppLogo />
            <InputText placeholder='Enter Username' textChange={usernameChange} />
            <InputText secureEntry={true}
                placeholder="Enter Password"
                textChange={passwordChange}
            />
            <Button btnClick={handeClick} btnText='Login' />
            <Button btnClick={handeClick} btnText='Signup' />
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

export default LoginScreen
