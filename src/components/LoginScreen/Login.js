import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput
} from 'react-native';
import { LoginStyle } from './styles';
import Register from './RegisterModal';
import firebase from "react-native-firebase";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { firebaseConfig } from '../../configurations/ConfigDB';
import Upgrade from './UpgradeModal';
import MainScreen from '../MainScreen/MainScreen';

const Login = () => {
    const [visibleRegisterModal, setvisibleRegisterModal] = useState(false);
    const [visibleUpgradeModal, setvisibleUpgradeModal] = useState(false);
    const [visibleMainModal, setvisibleMainModal] = useState(false);
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [displayname, setDisplayname] = useState('')
    const [newUser, setNewUser] = useState({})
    const [key, setkey] = useState('')
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        phonenumber: '',
        address: '',
        birthday: '',
        avatar: '',
    });

    const demoDatabase = firebaseConfig.database().ref("demoDatabase");
    const usersData = demoDatabase.child("users")
    setVisibleForRegisterModal = (value) => {
        setvisibleRegisterModal(value);
    }
    setVisibleForUpgradeModal = (value) => {
        setvisibleUpgradeModal(value);
    }
    setVisibleForMainModal = (value) => {
        setvisibleMainModal(value);

    }
    checkToLogin = () => {
        if (emailLogin === '' || passwordLogin === '')
            return false;
        return true;

    }
    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
            .then((user) => {
                setvisibleMainModal(true);
            }).catch((err) => {
                alert('Login fail: ' + err);
            })
    }
    onLoginWithFB = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile']);
            if (result.isCancelled) {
                alert('You have just canceled your login request');
            }
            else {
                const data = await AccessToken.getCurrentAccessToken();
                if (!data) {
                    console.log('Something went wrong obtaining the users access token');
                }
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
                if (firebaseUserCredential.additionalUserInfo.isNewUser) {
                    await setNewUser(firebaseUserCredential.user.providerData[0]);
                    setvisibleUpgradeModal(true);
                }
                else {
                    setvisibleMainModal(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '804692216288-oksb32jtujsbbrcgda6fhk2vaj5n813m.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                if(user.displayName!=null){
                    setDisplayname(user.displayName)
                }
                else{
                    usersData.child(user.uid).on('value',(snapshot)=>{
                        if(typeof snapshot != "undefined"){
                            console.log('1111',snapshot.val().username)
                            setDisplayname(snapshot.val().username)
                        }
                    })
                }
                setvisibleMainModal(true);
            } else {
            }
        });
    })
    onLoginWithGG = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            if (firebaseUserCredential.additionalUserInfo.isNewUser) {
                await setNewUser(firebaseUserCredential.user.providerData[0])
                setvisibleUpgradeModal(true);

            }
            else {
                setvisibleMainModal(true);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        if (user.id != '') {
            usersData.child(user.id).set(user);
        }
    }, [user])
    const setDataForUser = (id, username, email, phonenumber, address, birthday, avatar) => {
        setUser({
            ...user,
            id: id,
            username: username,
            email: email,
            phonenumber: phonenumber,
            address: address,
            birthday: birthday,
            avatar: avatar,
        })
    }
    return (
        <View
            style={LoginStyle.viewMain}
        >
            <ImageBackground
                source={require('../../assets/Images/Backgrounds/bgrLogin.jpg')}
                style={LoginStyle.imgBgrMain}
            />
            <View style={LoginStyle.brgMain} />
            <View
                style={LoginStyle.viewContent}
            >
                <TextInput style={LoginStyle.txtipLoginInformation}
                    placeholder="Enter email"
                    placeholderTextColor='#6E6E6E'
                    value={emailLogin}
                    onChangeText={(value) => {
                        setEmailLogin(value)
                    }}
                />
                <TextInput style={LoginStyle.txtipLoginInformation}
                    placeholder="Enter password"
                    placeholderTextColor='#6E6E6E'
                    secureTextEntry={true}
                    value={passwordLogin}
                    onChangeText={(value) => {
                        setPasswordLogin(value)
                    }}
                />
                <TouchableOpacity
                    style={LoginStyle.btnLogin}
                    activeOpacity={0.5}
                    onPress={() => {
                        if (!checkToLogin()) {
                            alert('Enter login information, please!');

                        } else {
                            onLogin();
                        }
                    }}
                >
                    <Text
                        style={LoginStyle.txtBtnLogin}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={LoginStyle.btnRegister}
                    activeOpacity={0.5}
                    onPress={() => {
                        setPasswordLogin('');
                        setEmailLogin('');
                        setVisibleForRegisterModal(true);
                    }}
                >
                    <Text
                        style={{ fontSize: 15, fontWeight: '100', color: 'white' }}
                    >
                        Create new account
                </Text>
                </TouchableOpacity>
                <View
                    style={LoginStyle.viewLoginWithSocial}
                >
                    <TouchableOpacity
                        style={LoginStyle.btnLoginWithSocial}
                        activeOpacity={0.5}
                        onPress={async () => {
                            await onLoginWithFB();
                        }}
                    >
                        <Image
                            source={require('../../assets/Images/Icons/facebook.png')}
                        />
                        <Text
                            style={LoginStyle.txtLoginWithSocial}
                        >
                            Login with facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={LoginStyle.btnLoginWithSocial}
                        activeOpacity={0.5}
                        onPress={async () => {
                            await onLoginWithGG();
                        }}
                    >
                        <Image
                            source={require('../../assets/Images/Icons/google.png')}
                        />
                        <Text
                            style={LoginStyle.txtLoginWithSocial}
                        >
                            Login with google
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Register
                usersData={usersData}
                visible={visibleRegisterModal}
                setVisible={(value) => { setVisibleForRegisterModal(value) }}
            />
            <Upgrade
                newUser={newUser}
                setDataForUser={(id, username, email, phonenumber, address, birthday, avatar) => setDataForUser(id, username, email, phonenumber, address, birthday, avatar)}
                visible={visibleUpgradeModal}
                setVisible={(value) => { setVisibleForUpgradeModal(value) }}
                setVisibleForMain={(value) => { setVisibleForMainModal(value) }}
            />
            <MainScreen
                visible={visibleMainModal}
                setVisible={(value) => { setVisibleForMainModal(value) }}
                user={user}
                displayname={displayname}
            />
        </View>
    )
}
export default Login;