import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import axios from 'axios';
import Card from '../../Component/Card'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        fetchSitters()
    }, [])
    const [allsitters, setallsitters] = useState([])

    function fetchSitters() {
        axios.get('http://localhost:3000/sitters')
            .then(res => {
                // console.log(res.data)
                setallsitters(res.data)
                // console.log(res.data);
                // console.log(allsitters);
            })
            .catch(err => console.log(err))
    }
    const [area, setarea] = useState('')
    const setlocation = (value) => {
        setallsitters([])
        const body = {
            location: value
        }
        setarea(value)
        axios.post('http://localhost:3000/sitters/location', body)
            .then(res => setallsitters(res.data))
            .catch(err => console.log(err))
    }
    // const setsort = (value) => { 
    //     if (value == 'Charges') {
    //         setallsitters([])
    //         const body = {
    //             location:value
    //         }
    //         console.log(area);
    //         axios.post('http://localhost:3000/sitters/charges', body)
    //             .then(res => setallsitters(res.data))
    //             .catch(err => console.log(err))
    //     }
    // }

    const handleClick = (value) => {
        navigation.navigate('ViewSitter', value)
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerText}>Caretakers Nearby</Text> */}
            <View style={styles.sortView}>
                <RNPickerSelect
                    onValueChange={(value) => setlocation(value)}

                    placeholder={{
                        label: 'Choose Location:',
                        value: null,
                    }}
                    style={pickerStyle}
                    items={[
                        { label: 'Toronto', value: 'Toronto' },
                        { label: 'Mississauga', value: 'Mississauga' },
                        { label: 'Brampton', value: 'Brampton' },
                        { label: 'Oakville', value: 'Oakville' },
                    ]}
                />
                {/* <RNPickerSelect
                    onValueChange={(value) => setsort(value)}

                    placeholder={{
                        label: 'Filter',
                        value: null,
                    }}
                    style={pickerStyle}
                    items={[
                        { label: 'Experience', value: 'Experience' },
                        { label: 'Charges', value: 'Charges' },
                    ]}
                /> */}
            </View>

            <FlatList data={allsitters}
                keyExtractor={item => item.username}
                style={{ marginTop: 40 }}
                renderItem={({ item }) =>
                    <Card sitter={item} onPress={handleClick} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    }, headerText: {
        fontSize: 24,
        marginLeft: 20
    }, sortView: {
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',

    }
})
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
export default HomeScreen
