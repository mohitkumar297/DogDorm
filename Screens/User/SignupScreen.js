import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import InputText from '../../Component/InputText'
import Button from '../../Component/Button'
import AppLogo from '../../Component/AppLogo'
import axios from 'axios'

const Signup = ({navigation}) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [passwordconfirm, setpasswordconfirm] = useState('')

    const usernameChange = (value) => {
        setusername(value)
    }

    const passwordChange = (value) => {
        setpassword(value)
    }

    const passwordChangeConfirm = (value) => {
        setpasswordconfirm(value)
    }

    const handleClick = () => {

        if (password === passwordconfirm) {
            const newuser = {
                username: username,
                password: password
            }
            axios.post('http://localhost:3000/users/register', newuser)
                .then(res => {
                    console.log(res.data)
                    if(res.data === 'Success'){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                          });
                    }else{
                        Alert.alert(res.data.message)
                    }
                })
                .catch(err => console.log(err))
        } else {
            Alert.alert('Enter exact same password')
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

            <InputText secureEntry={true}
                placeholder="Confirm Password"
                textChange={passwordChangeConfirm}
            />
            <Button btnText='Signup' btnClick={handleClick} />
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
export default Signup
