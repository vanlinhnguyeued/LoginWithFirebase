import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { RegisterStyle, LoginStyle } from './styles';
import firebase from "react-native-firebase";


const Upgrade = (props) => {

    const [id, setID] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [avatar, setAvatar] = useState('');


    useEffect(() => {
        setID(props.newUser.uid);
        setUsername(props.newUser.displayName);
        setEmail(props.newUser.email);
        setPhonenumber(props.newUser.phoneNumber);
        setAvatar(props.newUser.photoURL);
    }, [props.newUser]);
    const onUpdate = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to update your information?',
            [
                {
                    text: 'Yes', onPress: () => {
                        props.setDataForUser(id, username, email, phonenumber, address, birthday, avatar);
                        props.setVisible(false);
                        props.setVisibleForMain(true);
                        alert('Updated')
                    }
                },
                {
                    text: 'No', style: 'cancel', onPress: () => {
                    }
                },
            ],
            { cancelable: true },
        );
    }
    return (
        <View>
            <Modal
                visible={props.visible}
                animationType='slide'
            >
                <View
                    style={RegisterStyle.viewMain}
                >
                    <ImageBackground
                        source={require('../../assets/Images/Backgrounds/bgrRegister.jpeg')}
                        style={LoginStyle.imgBgrMain}
                    />
                    <View style={LoginStyle.brgMain} />
                    <View style={RegisterStyle.viewContent} >
                        <Text style={LoginStyle.txtipLoginInformation}>
                            {username}
                        </Text>
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your email"
                            placeholderTextColor='#6E6E6E'
                            value={email}
                            onChangeText={(value) => {
                                setEmail(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your address"
                            placeholderTextColor='#6E6E6E'
                            value={address}
                            onChangeText={(value) => {
                                setAddress(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your phone number"
                            placeholderTextColor='#6E6E6E'
                            value={phonenumber}
                            onChangeText={(value) => {
                                setPhonenumber(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your birthday"
                            placeholderTextColor='#6E6E6E'
                            value={birthday}
                            onChangeText={(value) => {
                                setBirthday(value)
                            }}
                        />
                        <TouchableOpacity
                            style={LoginStyle.btnLogin}
                            activeOpacity={0.5}
                            onPress={() => {
                                onUpdate();
                            }}

                        >
                            <Text
                                style={LoginStyle.txtBtnLogin}
                            >
                                Update
                    </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    )
}
export default Upgrade;
