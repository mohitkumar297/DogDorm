import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native'
import InputText from '../../Component/InputText'
import Button from '../../Component/Button'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const RegisterSitterScreen = ({ navigation }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [fullname, setfullname] = useState('')
    const [mobile, setmobile] = useState('')
    const [charges, setcharges] = useState('')
    const [location, setlocation] = useState('')
    const [preference, setpreference] = useState('')
    const [experience, setexperience] = useState('')
    const [imagefile, setimagefile] = useState(null)

    const usernameChange = (value) => {
        setusername(value)
    }
    const fullnameChange = (value) => {
        setfullname(value)
    }
    const passwordChange = (value) => {
        setpassword(value)
    }
    const mobileChange = (value) => {
        setmobile(value)
    }
    const chargesChange = (value) => {
        setcharges(value)
    }
    const locationChange = (value) => {
        setlocation(value)
    }
    const preferenceChange = (value) => {
        setpreference(value)
    }
    const experienceChange = (value) => {
        setexperience(value)
    }

    const handleClick = () => {
        const newSitter = new FormData()
        newSitter.append('fullName', fullname)
        newSitter.append('username', username)
        newSitter.append('password', password)
        newSitter.append('mobile', mobile)
        newSitter.append('charges', charges)
        newSitter.append('location', location)
        newSitter.append('preferenceOfDogs', preference)
        newSitter.append('experience', experience)

        newSitter.append('fileData', {
            uri: imagefile.uri,
            type: imagefile.type,
            name: 'myImage'
        });
        console.log('here');
        console.log(newSitter);

        // axios.post('http://localhost:3000/sitters/register', newSitter)
        axios({
            method: "POST",
            url: 'http://localhost:3000/sitters/register',
            data: newSitter,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res.data)
            if (res.data === 'Sitter added!') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SitterProfile' }],
                });
            }
        })
            .catch(err => console.log(err))
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        setimagefile(result)
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const pickCameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);
        setimagefile(result)
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }


    const chooseTypeOfImage = (value) => {
        if (value == 'Gallery') {
            pickImage()
        } else if (value == 'Camera') {
            pickCameraImage()
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => { }} style={styles.imgContainer}>
                    {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} placeholder="Image Here" />}
                </TouchableOpacity>
                <RNPickerSelect
                    onValueChange={(value) => chooseTypeOfImage(value)}
                    placeholder={{
                        label: 'Choose an Image',
                        value: null,
                    }}
                    style={imagePickerStyle}
                    items={[
                        { label: 'Gallery', value: 'Gallery' },
                        { label: 'Camera', value: 'Camera' },
                    ]}
                />

                <InputText placeholder="Enter Full Name" textChange={fullnameChange} />
                <InputText placeholder="Email" textChange={usernameChange} />
                <InputText placeholder="Password" secureEntry={true} textChange={passwordChange} />
                <InputText placeholder="Mobile" textChange={mobileChange} />
                <InputText placeholder="Charges /Night" textChange={chargesChange} />
                <InputText placeholder="Location" textChange={locationChange} />

                <RNPickerSelect
                    onValueChange={(value) => setpreference(value)}

                    placeholder={{
                        label: '----Select a Preference for dogs----',
                        value: null,
                    }}
                    style={pickerStyle}
                    items={[
                        { label: 'Weight < 20kgs', value: 'Weight < 20kgs' },
                        { label: 'Weight < 40kgs', value: 'Weight < 40kgs' },
                        { label: 'Any Dog', value: 'Any Dog' },
                    ]}
                />
                {/* <GooglePlacesAutocomplete
                    placeholder="Search"
                    query={{
                        key: 'AIzaSyCy6W-UgXUyFM55Cagw1GUvecJIwuTSJsk',
                        language: 'en',
                    }}
                    onPress={(data, details = null) => console.log(data)}
                    onFail={(error) => console.error(error)}
                /> */}
                <InputText placeholder="Experience" textChange={experienceChange} />
                <Button btnText='Register' btnClick={handleClick} />
            </ScrollView>
        </View>
    )
}

const pickerStyle = {
    inputIOS: {
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 18
    },
    placeholder: {
        color: 'black',
    },
    inputAndroid: {
        color: 'black',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        fontSize: 18
    }
};

const imagePickerStyle = {
    inputIOS: {
        alignSelf: 'center',
        // width: 150, height: 150,
        // borderWidth: 1,
        // borderColor: 'gray',
        // borderRadius: 10
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
    , imgContainer: {
        alignSelf: 'center',
        width: 150, height: 150,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10
    },
})


export default RegisterSitterScreen
