import { StyleSheet, Dimensions } from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
//Login style
var LoginStyle = StyleSheet.create({
    viewMain: {
        flex: 1,
        height: heightScreen,
        width: widthScreen,
        position: 'relative',
    },
    imgBgrMain: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    brgMain: {
        height: '100%',
        width: '100%',
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#424242'
    },
    viewContent: {
        position: 'absolute',
        top: '40%',
        left: '0%',
        width: '100%',
        height: '60%',
        flexDirection: 'column',
        padding: 20,
    },
    txtipLoginInformation: {
        width: '90%',
        height: 50,
        borderBottomColor: '#6E6E6E',
        borderBottomWidth: 1,
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        marginBottom: 5
    },
    btnLogin: {
        width: '50%',
        height: 50,
        backgroundColor: '#8A0829',
        alignSelf: 'center',
        marginTop: 20,
        opacity: 0.7,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtnLogin: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        textTransform : "uppercase",
        letterSpacing: 2
    },
    btnRegister: {
        width: '60%',
        height: 20,
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
    },
    btnLoginWithSocial: {
        width: '49%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewLoginWithSocial: {
        width: '100%',
        height: '10%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtLoginWithSocial: {
        width: '70%',
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        
    }


});
var RegisterStyle = StyleSheet.create({
    viewMain:{
        flex: 1,
    },
    viewContent: {
        position: 'absolute',
        top: '20%',
        left: '0%',
        width: '100%',
        height: '60%',
        flexDirection: 'column',
        padding: 20,
    },
})
export { LoginStyle, RegisterStyle };