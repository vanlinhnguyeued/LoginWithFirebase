import firebase from 'react-native-firebase';

var androidConfig = {
    clientId: "804692216288-5r1joqiee9o95t11i062opsd3c91fihe.apps.googleusercontent.com",
    appId: "1:804692216288:android:01d6d9ff8472cae075c385",
    apiKey: "AIzaSyDr_iKxUu75q7x9qm0TbyHb0BQaW6xcDAI",
    databaseURL: "https://rnfirebaseefe.firebaseio.com",
    storageBucket: "rnfirebaseefe.appspot.com",
    messagingSenderId: "804692216288",
    projectId: "rnfirebaseefe",
}
export const firebaseConfig = firebase.initializeApp(androidConfig)
