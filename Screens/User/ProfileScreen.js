import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Button from '../../Component/Button'
import axios from 'axios'

const ProfileScreen = ({navigation}) => {
    useEffect(() => {
        checkIfLoggedIn()
    }, [])  

const [user, setuser] = useState('')

    const checkIfLoggedIn = () =>{
        axios.get('http://localhost:3000/users/checkIfAuthenticated')
        .then(res=>setuser(res.data))
        .catch(err=>console.log(err))
    }

    const handleClick = (value)=>{
        if(value == 'Logout'){
            axios.get('http://localhost:3000/users/logout')
            .then(res=>{
                if(res.data==='Logged Out Successfully'){
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                }
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <View style={styles.container}>
        <Image style={{width:100,height:100,alignSelf:'center',marginVertical:50}} source={require('../../assets/avatar.png')} />
            <Text style={{fontSize:22,alignSelf:'center', marginBottom:60}}>User Name : {user}</Text>
            {/* <Button style={styles.btnText} btnText='Add a pet' /> */}
            <Button style={styles.btnText} btnText='Logout' btnClick={handleClick}/>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex:1,
    // justifyContent:'center',
    // alignItems:'stretch',
    textAlign:'center'
}, btnText:{
    backgroundColor:'black'
}
})

export default ProfileScreen
