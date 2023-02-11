import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler
} from 'react-native'
import { Constants } from '../Constants/Constants'
import { images } from '../Constants/Images'

const Sound = require('react-native-sound')
const playSound = require('../Constants/bonusSound.mp3')

export const HomeScreen = ({ navigation, isGetBonus, setGetBonus }) => {
    const getBonus = () => {
        setGetBonus(true)
        hello?.play((success) => {
            if (!success) {
                console.log('Sound did not play')
            }
        })
    }

    const [hello, setHello] = useState(null)

    useEffect(() => {
        setHello(() => {
            return new Sound(playSound, Sound.MAIN_BUNDLE)
        })
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar
                hidden={true}
                backgroundColor='transparent'
                translucent={true}
            />
            <Image
                style={styles.backgroundImage}
                source={images.background}
                resizeMode='stretch'
            />
            <StatusBar
                hidden={true}
                backgroundColor='transparent'
                translucent={true}
            />
            <View>
                <Text style={styles.headerTxt}>NAZVANIE</Text>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('App')}
            >
                <Text
                    style={styles.btnTxt}
                >
                    Start
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => getBonus()}>
                <Text
                    style={styles.btnTxt}
                >
                    Get bonus
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => BackHandler.exitApp()}>
                <Text
                    style={styles.btnTxt}
                >
                    QUIT APP
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        width:Constants.MAX_WIDTH,
        height:Constants.MAX_HEIGHT
    },
    backgroundImage: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        position: 'absolute'
    },
    btn: {
        width: '30%',
        backgroundColor: 'rgb(34,13,95)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        borderRadius:10
    },
    btnTxt:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'gold',
        padding:6,
        letterSpacing:2
    },
    headerTxt:{
        fontWeight:'bold',
        fontSize:30,
        color:'gold',
        textTransform:'uppercase',
        color:'rgb(34,13,95)',
        textShadowColor:'gold',
        textShadowRadius:10,
        elevation:10,
    }
})
