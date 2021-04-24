import React, { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Buffer } from 'buffer'

const ProfileImage = ({img}) => {
    useEffect(() => {
        decodeBase64(img.data.data)
    }, [])
    const [profileImg, setprofileImg] = useState(null)
    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');

        setprofileImg(b64)
    }
    return (
        <Image style={styles.img} source={{ uri: "data:image/png;base64, " + profileImg }} />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2
    }
})
export default ProfileImage
