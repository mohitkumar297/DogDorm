import React from 'react'
import {Image, StyleSheet } from 'react-native'

const AppLogo = (props) => {
    return (
        <Image
        style={styles.img} source={require('../assets/dogdorm.png')} />
    )
}
const styles = StyleSheet.create({
img:{
    alignSelf:'center',
    height:200,
    width:200,
    resizeMode:'contain',
    bottom:30,
    borderRadius: 200 / 2,
    overflow: "hidden",
}
})

export default AppLogo
