import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native'
import { Constants } from '../Constants/Constants'
import { ReelSet } from './ReelSet'
import { images } from '../Constants/Images'
import { SpinBtn } from './SpinBtn'
import { Bet } from './Bet'
import soundOn from '../Constants/img/soundOn.png'
import soundOff from '../Constants/img/soundOff.png'
import { ModalWin } from './ModalWin'
import { ModalLoader } from './ModalLoader'
const Sound = require('react-native-sound')
const playSound = require('../Constants/sound.mp3')
const playSound2 = require('../Constants/winSound.mp3')
const playSound3 = require('../Constants/OTTiZ-IFoundYou.mp3')

const AppInner = ({ navigation, setGetBonus, isGetBonus }) => {
    const [casinoState, setCasinoState] = useState({
        sound: true,
        balance: isGetBonus ? 1000 : 500,
        bet: 100,
        isWin: false
    })
    let reelSet = null
    const [hello, setHello] = useState(new Sound(playSound, Sound.MAIN_BUNDLE))
    const [hello2, setHello2] = useState(
        new Sound(playSound2, Sound.MAIN_BUNDLE)
    )
    const [hello3, setHello3] = useState(
        new Sound(playSound3, Sound.MAIN_BUNDLE)
    )

    const [modalVisible, setModalVisible] = useState(false)
    const [loaderVisible, setLoaderVisible] = useState(true)

    useEffect(() => {
        setGetBonus(false)

        setTimeout(() => {
            setLoaderVisible(false)
            if (casinoState.sound) {
                hello3.setNumberOfLoops(-1)
                hello3.play()
            }
        }, 2000)
    }, [])

    useEffect(() => {
        if (casinoState.isWin) {
            if (casinoState.sound) hello2?.play()
            setModalVisible(true)
        }
    }, [casinoState.isWin])

    const spin = () => {
        const calcBalance = casinoState.balance - casinoState.bet
        if (calcBalance >= 0) {
            setCasinoState((prev) => {
                return {
                    ...prev,
                    balance: calcBalance
                }
            })
            reelSet.spin()
            if (casinoState.sound) hello?.play()
        } else alert("You don't have enought money")
    }

    const turnOffBackgroundMusic = () => {
        hello3.stop()
    }
    useEffect(() => {
        if (casinoState.sound) {
            hello3.stop()
            hello3.play()
        } else hello3.stop()
    }, [casinoState.sound])

    return (
        <View style={styles.container}>
            <ModalWin
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <ModalLoader
                loaderVisible={loaderVisible}
                setLoaderVisible={setLoaderVisible}
            />
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

            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home')
                        turnOffBackgroundMusic()
                    }}
                    style={styles.soundImg}
                >
                    <Image
                        style={styles.soundImgMin}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/9072/9072033.png'
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.balance}>
                    {casinoState.balance === 0
                        ? 'Return home and get bonus'
                        : `Balance: ${casinoState.balance}`}
                </Text>
            </View>
            <View style={styles.mainBar}>
                <ReelSet
                    setCasinoState={setCasinoState}
                    ref={(ref) => {
                        reelSet = ref
                    }}
                />
            </View>
            <View style={styles.bottomBar}>
                {casinoState.sound ? (
                    <TouchableOpacity
                        style={styles.soundImg}
                        onPress={() => {
                            setCasinoState((prev) => ({
                                ...prev,
                                sound: !prev.sound
                            }))
                        }}
                    >
                        <Image style={styles.soundImgMin} source={soundOn} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.soundImg}
                        onPress={() => {
                            setCasinoState((prev) => ({
                                ...prev,
                                sound: !prev.sound
                            }))
                        }}
                    >
                        <Image style={styles.soundImgMin} source={soundOff} />
                    </TouchableOpacity>
                )}

                <SpinBtn onPress={spin} />

                <Bet state={casinoState} setState={setCasinoState} />
            </View>
        </View>
    )
}

export default AppInner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    backgroundImage: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        position: 'absolute'
    },
    topBar: {
        width: Constants.MAX_WIDTH,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    mainBar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT - 120,
    },
    bottomBar: {
        width: Constants.MAX_WIDTH,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    balance: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gold'
    },
    soundImg: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'rgb(34,13,95)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    soundImgMin: {
        width: 40,
        height: 40,
        padding: 10
    }
})
