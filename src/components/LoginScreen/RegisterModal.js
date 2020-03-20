import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { RegisterStyle, LoginStyle } from './styles';
import firebase from "react-native-firebase";


const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [avatar, setAvatar] = useState(require('../../assets/Images/Imgs/avtDefault.png'));
    const [passwordAgain, setpasswordAgain] = useState('');
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        phonenumber: '',
        address: '',
        birthday: '',
        avatar: '',
    });


    
    checkForRegister = () => {
        if (passwordAgain.length > 0 && passwordAgain === password)
            return true;
        return false;
    }
    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((newUser) => {
                setUser({
                    ...user,
                    id: newUser.user.uid,
                    username: username,
                    email: email,
                    phonenumber: phonenumber,
                    address: address,
                    birthday: birthday,
                    avatar: avatar,
                });
                props.setVisible(false);
                alert('Register successful!');

            }).catch((err) => {
                Alert.alert(
                    'Alert',
                    err + ', are you sure you want to register again?',
                    [
                        {
                            text: 'Yes', style: 'cancel', onPress: () => {
                                setEmail('');
                                setPassword('');
                                setpasswordAgain('');
                                setAddress('');
                                setBirthday('');
                                setUsername('');
                                setPhonenumber('');
                            }
                        },
                        {
                            text: 'No', onPress: () => {
                                props.setVisible(false);
                            }
                        },
                    ],
                    { cancelable: true },
                );
            })
    }
    useEffect(() => {
        if (user.id != '') {
            props.usersData.child(user.id).set(user);
        }
    }, [user]);
    
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
                    <View
                        style={RegisterStyle.viewContent}
                    >
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your email"
                            placeholderTextColor='#6E6E6E'
                            value={email}
                            onChangeText={(value) => {
                                setEmail(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your password"
                            placeholderTextColor='#6E6E6E'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your password again"
                            placeholderTextColor='#6E6E6E'
                            secureTextEntry={true}
                            value={passwordAgain}
                            onChangeText={(value) => {
                                setpasswordAgain(value)
                            }}
                        />
                        <TextInput style={LoginStyle.txtipLoginInformation}
                            placeholder="Enter your user name"
                            placeholderTextColor='#6E6E6E'
                            value={username}
                            onChangeText={(value) => {
                                setUsername(value)
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
                                if (checkForRegister()) {
                                    onRegister();
                                    setEmail('');
                                    setPassword('');
                                    setpasswordAgain('');
                                    setAddress('');
                                    setBirthday('');
                                    setUsername('');
                                    setPhonenumber('');
                                } else {
                                    Alert.alert(
                                        'Alert',
                                        'Password incorrect, are you sure you want to register again?',
                                        [
                                            {
                                                text: 'Yes', style: 'cancel', onPress: () => {
                                                    setPassword('');
                                                    setpasswordAgain('');
                                                }
                                            },
                                            {
                                                text: 'No', onPress: () => {
                                                    props.setVisible(false);
                                                }
                                            },
                                        ],
                                        { cancelable: true },
                                    );
                                }

                            }}
                        >
                            <Text
                                style={LoginStyle.txtBtnLogin}
                            >
                                Confirm
                    </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    )
}
export default Register;
