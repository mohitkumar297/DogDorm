import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator'
import SitterBottomTabNavigator from './SitterBottomTabNavigator'
import AppLogo from '../Component/AppLogo'
import Button from '../Component/Button'



const AppNavigator = () => {

    const [routeuser, setrouteuser] = useState(false)
    const [routesitter, setroutesitter] = useState(false)

    const route = () => {
        if (routeuser) {
            return (<BottomTabNavigator />)
        } else if (routesitter) {
            console.log('3');
            return(<SitterBottomTabNavigator />)
        }
    }


    const routeSelected = (selection) => {
        if (selection === 'Pet Owner') {
            setrouteuser(!routeuser)
            console.log('1');
        } else {
            setroutesitter(!routesitter)
            console.log('2');
        }
    }

    return (
        <NavigationContainer>
            {routeuser ? route() : routesitter ? route() :<View style={styles.container}>
                <AppLogo />
                <Button btnText='Pet Owner' btnClick={routeSelected} />
                <Button btnText='Offer Services' btnClick={routeSelected} />
            </View>}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20
    }
})

export default AppNavigator
