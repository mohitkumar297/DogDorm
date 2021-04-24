import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

import ProfileImage from './ProfileImage'

const Card = ({ sitter, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(sitter)}>
            <View >
                <ProfileImage img={sitter.profileImage} />
            </View>
            <View style={styles.holdingView}>
                    <Text style={{ fontSize: 18 }}>{sitter.fullName}</Text>
                    <Text>{sitter.location}</Text>
                    {/* <Text>{sitter.rating}</Text> */}
                </View>
                <View style={styles.holdingChargeView}>
                    <Text style={{fontSize:16}}>${sitter.charges}/day</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
                card: {
                flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
        marginVertical: 30,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: 'grey',
    },
    holdingView: {
                // borderWidth: 1,
                width: 200,
        marginLeft: 20
    },
    
})
export default Card


