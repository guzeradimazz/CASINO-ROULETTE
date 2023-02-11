import React from 'react'
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Constants } from '../Constants/Constants'

export const ModalLoader = ({ loaderVisible, setLoaderVisible }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={loaderVisible}
                onRequestClose={() => {
                    setLoaderVisible(!loaderVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size='large' />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT - 120,
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
        backgroundColor: 'rgba(34,13,95,0.5)',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})
