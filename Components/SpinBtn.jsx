import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

export const SpinBtn = ({ onPress }) => {
    const [status, setStatus] = useState(true)

    const onPressFunc = () => {
        onPress()
        setStatus(false)
        setTimeout(() => {
            setStatus(true)
        }, 3000)
    }
    return (
        <TouchableOpacity
            disabled={!status}
            style={status ? styles.inActive : styles.inActiveDis}
            onPress={onPressFunc}
        >
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20
                }}
            >
                SPIN
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inActive: {
        backgroundColor: '#7ef542',
        width: 120,
        justifyContent: 'center',
        borderRadius: 50,
        height: 50
    },
    inActiveDis: {
        backgroundColor: '#749962',
        width: 120,
        justifyContent: 'center',
        borderRadius: 50,
        height: 50
    }
})
