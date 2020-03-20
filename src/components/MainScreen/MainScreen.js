import React, { useState, useEffect, useRef } from 'react';
import {
    Dimensions, View, Text,
    TouchableOpacity, Image, ActivityIndicator,
    ScrollView, Animated, Modal
} from 'react-native';
import { firebaseConfig } from '../../configurations/ConfigDB';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Carousel from 'react-native-snap-carousel';
import firebase from "react-native-firebase";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk'
import styles from './styles'

const WIDTH_SCREEN = Dimensions.get('screen').width;
const HEIGHT_SCREEN = Dimensions.get('screen').height;

const RenderContent = (props) => {
    const Ingredients = () => (
        <View style={styles.vIngredients}>
            {listIngredient.map((item, index) => {
                return (
                    <View style={styles.vIngredientsItem} key={index}>
                        <Text style={styles.txtTips}>
                            {item.name}
                        </Text>
                        <Text style={styles.txtTips}>
                            {item.amount}
                        </Text>
                    </View>
                )

            })}
        </View>
    )
    const Tips = () => (
        <View style={styles.vIngredients}>
            <Text style={styles.txtTips}>
                {props.item.tips}
            </Text>
        </View>
    )
    const [listIngredient, setListIngredient] = useState([])
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'ingredients', title: 'Ingredients' },
        { key: 'tips', title: 'Tips' }
    ]);
    const renderScene = SceneMap({
        ingredients: Ingredients,
        tips: Tips,
    })
    const renderTabBar = props => (
        <TabBar
            {...props}
            renderLabel={({ route }) => (
                <Text style={styles.txtMeaning}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: 'gray' }}
            style={{ backgroundColor: 'white', color: 'gray', }}
        />
    )




    //animation
    const [pressCall, setPressCall] = useState(new Animated.Value(0));
    const opacityMAXTOMIN = pressCall.interpolate({
        inputRange: [0, 5],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })
    const opacityMINTOMAX = pressCall.interpolate({
        inputRange: [0, 5],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
    const heightVRecipe = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    })
    const topVImgFood = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [50, 0],
        extrapolate: 'clamp',
    })
    const topVInfor = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [HEIGHT_SCREEN / 2.5 + 50, HEIGHT_SCREEN / 2.5],
        extrapolate: 'clamp',
    })
    const fsTxtTypeFood = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [15, 25],
        extrapolate: 'clamp',
    })
    const fsTxtNameFood = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [25, 37],
        extrapolate: 'clamp',
    })
    const topVRecipe = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [HEIGHT_SCREEN / 2.5 + 50 + 100, HEIGHT_SCREEN / 2.5 + 50 + 80],
        extrapolate: 'clamp',
    })
    const heightViewItem = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [HEIGHT_SCREEN, HEIGHT_SCREEN + 350],
        extrapolate: 'clamp',
    })
    const marginTopLogo = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [-10, 30],
        extrapolate: 'clamp',
    })
    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <Animated.View style={[styles.vItem, { height: heightViewItem }]}>
                    <Animated.View style={[styles.vImgFood, { top: topVImgFood }]}>
                        <Image
                            style={styles.imgFood}
                            source={{ uri: props.item.image }}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.vInfor, { top: topVInfor }]}>
                        <Animated.Text style={[styles.txtTypeFood, { fontSize: fsTxtTypeFood }]}>
                            Chocolate
                        </Animated.Text>
                        <Animated.Text style={[styles.txtNameFood, { fontSize: fsTxtNameFood, }]}>
                            {props.item.name}
                        </Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.vbtnRecipe, { opacity: opacityMAXTOMIN, top: topVRecipe }]}>
                        <TouchableOpacity
                            style={styles.btnShow}
                            activeOpacity={0.5}
                            onPress={() => {
                                Animated.timing(pressCall, { toValue: 10, duration: 300, }).start(() => {
                                    setListIngredient(Object.values(props.item.ingredients));
                                });
                                props.setScrollEnable(false)
                                props.animationWhenPress();
                            }}
                        >
                            <Text style={styles.txtbtnShow}>
                                show recipe
                        </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.vRecipe, { opacity: opacityMINTOMAX, height: heightVRecipe, top: HEIGHT_SCREEN / 2.5 + 50 + 80 }]}>
                        <Text style={styles.txtMeaning}>
                            Chocolate is a kind of candy with a slight bitter taste at the
                            beginning of the bite..
                        </Text>
                        <Animated.View style={[styles.vimgLogo, { marginTop: marginTopLogo }]}>
                            <Image
                                style={styles.imgLogo}
                                source={require('../../assets/Images/Logos/ph-logo.png')}
                            />
                        </Animated.View>
                        <TabView
                            renderTabBar={renderTabBar}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                        />
                    </Animated.View>
                </Animated.View>
            </ScrollView>
            <Animated.View style={[styles.headerBtn, { left: 10, opacity: opacityMINTOMAX }]}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        Animated.timing(pressCall, { toValue: 0, duration: 300, }).start();
                        props.setScrollEnable(true)
                        props.animationWhenPress2();
                    }}
                >
                    <Image style={{ flex: 1, width: null, height: null }} source={require('../../assets/Images/Icons/back.png')} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.headerBtn, { right: 10, opacity: opacityMINTOMAX }]}>
                <TouchableOpacity style={{ flex: 1 }} >
                    <Image
                        style={{ flex: 1, width: null, height: null }}
                        source={require('../../assets/Images/Icons/heart.png')}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const MainScreen = (props) => {
    const demoDatabase = firebaseConfig.database().ref("demoDatabase");
    const foods = demoDatabase.child("foods");
    const [listFoods, setListFoods] = useState([]);
    const [scEnable, setScEnable] = useState(true)
    const carousel = useRef(null)
    const [pressCall, setPressCall] = useState(new Animated.Value(0))


    useEffect(() => {
        if (listFoods.length == 0) {
            foods.on('value', (snapshot) => {
                setListFoods(Object.values(snapshot.val()))
            })
        }
    })
    const setScrollEnable = (val) => {
        setScEnable(val)
    }
    const animationWhenPress = () => {
        Animated.timing(pressCall, { toValue: 10, duration: 300, }).start();

    }
    const animationWhenPress2 = () => {
        Animated.timing(pressCall, { toValue: 0, duration: 300, }).start();
    }
    const btnTop = pressCall.interpolate({
        inputRange: [0, 10],
        outputRange: [10, -40],
        extrapolate: 'clamp',
    });
    const onLogout = async () => {
        firebase.auth().signOut().then(function () {
        }).catch(function (error) {
        });
        await FBLogout();
        await GGLogOut();
        props.setVisible(false);

    }
    const GGLogOut = async () => {
        try {
          await GoogleSignin.signOut();
        } catch (error) {
          console.log(error);
        }
      };
    const FBLogout = async () => {
        let logout =
            new GraphRequest(
                "me/permissions/",
                {
                    accessToken: await AccessToken.getCurrentAccessToken().accessToken,
                    httpMethod: 'DELETE'
                },
                async (error, result) => {
                    if (error) {
                        //console.log('Error fetching data: ' + error.toString());
                    } else {
                        LoginManager.logOut();
                    }
                });
        new GraphRequestManager().addRequest(logout).start();
    };

    if (listFoods.length == 0) {
        return (
            <View style={styles.vMain}>
                <ActivityIndicator />
            </View>
        )
    }
    else {
        return (
            <Modal visible={props.visible} animationType='slide' >
                <Carousel
                    scrollEnabled={scEnable}
                    ref={carousel}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    sliderHeight={HEIGHT_SCREEN}
                    itemHeight={HEIGHT_SCREEN}
                    vertical
                    data={listFoods}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderContent
                                animationWhenPress2={() => { animationWhenPress2() }}
                                animationWhenPress={() => { animationWhenPress() }}
                                item={item}
                                setScrollEnable={(val) => { setScrollEnable(val) }}
                            />
                        )
                    }}
                />
                <Animated.View style={[styles.vBtnLogout, { top: btnTop, }]}>
                    <TouchableOpacity
                        style={styles.btnLogout}
                        onPress={async () => {
                            await onLogout();
                        }}
                    >
                        <Text style={styles.txtBtnLogout}>
                            {props.displayname}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>

        )
    }
}
export default MainScreen;