import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import Button from '../../Component/Button'
import { Buffer } from 'buffer'

const ViewSitterScreen = ({ route, navigation }) => {

    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');
        return b64
    }

    useEffect(() => {
        // console.log('in');
        // console.log(route.params);
    }, [])

    const handleClick = (value) =>{
        
        navigation.navigate('ContactSitter', route.params)
    }
    return (
        <View>
        
        <ScrollView style={{marginTop:40}}>
        
            <Image style={styles.img} source={{ uri: "data:image/png;base64, " + decodeBase64(route.params.profileImage.data.data) }} />
            
                <Text style={{fontSize:20, marginLeft:20, marginVertical:20}}>{route.params.fullName}</Text>
                <Button btnText={`Contact ${route.params.fullName}`} btnClick={handleClick}/>
                <Text style={{fontSize:20, marginLeft:20, marginTop:20}}>Experience : {route.params.experience}</Text>
                <Text style={{fontSize:20, marginLeft:20, marginTop:20}}>Charges : ${route.params.charges}/day</Text>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 325,
        height: 325,
        left: 30
    }
})
export default ViewSitterScreen
