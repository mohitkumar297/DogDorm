import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.btnView} onPress={()=>{
            props.btnClick(props.btnText)
        }}>
            <Text style={styles.btnText}>{props.btnText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
btnView:{
    padding:10,
    backgroundColor:'#5eaaa8',
    alignItems:'center',
    margin:5
},btnText:{
    color:'white',
    fontSize:18
}
})

export default Button
