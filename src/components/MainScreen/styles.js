import { StyleSheet, Dimensions } from 'react-native';

const COLOR_TXT_1 = '#088A29';
const COLOR_TXT_2 = '#2E2E2E';
const WIDTH_SCREEN = Dimensions.get('screen').width;
const HEIGHT_SCREEN = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    vItem: {
        width: WIDTH_SCREEN,
        position: 'relative',
        backgroundColor: 'white'
    },
    vImgFood: {
        width: '100%',
        height: HEIGHT_SCREEN / 2.5,
        position: 'absolute',
    },
    imgFood: {
        flex: 1,
        width: null,
        height: null,
    },
    vInfor: {
        width: '100%',
        height: 100,
        position: 'absolute',
        flexDirection: 'column',
    },
    txtTypeFood: {
        marginTop: 20,
        color: COLOR_TXT_1,
        alignSelf: 'center',
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    txtNameFood: {
        marginTop: 5,
        color: COLOR_TXT_2,
        alignSelf: 'center',
        textTransform: "uppercase",
        fontWeight: "600",
        textAlign: 'center',
    },
    vbtnRecipe: {
        width: '50%',
        height: 50,
        position: 'absolute',
        alignSelf: 'center',
    },
    btnShow: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLOR_TXT_1,
        justifyContent: 'center',
        borderRadius: 10,
    },
    txtbtnShow: {
        textAlign: 'center',
        color: COLOR_TXT_1,
        alignSelf: 'center',
        fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: 1,
        fontWeight: "700",
    },
    vRecipe: {
        position: 'absolute',
        width: '100%',

    },
    vimgLogo: {
        width: '50%',
        height: 80,
        alignSelf: 'center',
    },
    imgLogo: {
        flex: 1,
        height: null,
        width: null,
    },
    vIngredients: {
        flex: 1,
    },
    txtTips: {
        fontSize: 20,
        letterSpacing: 1.5,
        textAlign: "auto",
        padding: 10,
    },
    txtMeaning: {
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        fontSize: 18,
        color: COLOR_TXT_1,
        letterSpacing: 2.5,
        fontWeight: '900',

    },
    headerBtn: {
        width: 30, height: 30, position: 'absolute', top: 10,
    },
    vIngredientsItem: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vBtnLogout: {
        width: '40%',
        height: 30,
        position: 'absolute',
        right: 10
    },
    txtBtnLogout: {
        textAlign: "center",
        fontSize: 15,

    },
    btnLogout: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#D8D8D8',
        borderRadius: 15,
    }


})
export default styles;