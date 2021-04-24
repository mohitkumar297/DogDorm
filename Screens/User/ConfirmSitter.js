import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ConfirmSitter = ({route}) => {
useEffect(() => {
    calculateBill(route.params);
}, [])

const [bill, setbill] = useState(0)
const calculateBill = () =>{
    setbill(route.params.numberOfDays * route.params.charges)
}
    return (
        <View style={styles.container}>
        <Image source={require('../../assets/confirm.png')} style={{width:125, height:125, marginTop:70}}/>
            <Text style={{alignSelf:'center', fontSize:18, marginVertical:10}}>You request has been completed</Text>
            <Text style={{alignSelf:'stretch', textAlign:'center',color:'white',paddingVertical:10, fontSize:16, marginVertical:10, backgroundColor:'black'}}>Details</Text>
           <View style={styles.viewC}>
            <Text style={{fontSize:18, marginVertical:10, color:'white'}}>You booked {route.params.fullName} on {route.params.dateBooked} for {route.params.numberOfDays} days.</Text>
            <Text style={{fontSize:18, marginVertical:10, color:'white'}}>Your Bill is : ${bill}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20, 
        alignItems:'center'
    },viewC:{
        backgroundColor:'#52b69a',
        paddingHorizontal:7

    }
})
export default ConfirmSitter
