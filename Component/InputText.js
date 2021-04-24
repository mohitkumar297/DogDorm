import React from 'react'
import {TextInput, StyleSheet } from 'react-native'

const InputText = (props) => {
    return (
        <TextInput
        style={styles.input}
        secureTextEntry={props.secureEntry}
        placeholder={props.placeholder}
        onChangeText={props.textChange}
         />
    )
}
const styles = StyleSheet.create({
   input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
      },
})
export default InputText
