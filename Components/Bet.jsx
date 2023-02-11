import React from 'react'
import { Button, TouchableOpacity, StyleSheet, Text, View } from 'react-native'

export const Bet = ({ state, setState }) => {
    const halfBet = () => {
        if (state.bet / 2 < 100) return null
        setState((prev) => {
            return { ...prev, bet: prev.bet / 2 }
        })
    }

    const doubleBet = () => {
        if (state.bet * 2 > state.balance) return null
        setState((prev) => {
            return { ...prev, bet: prev.bet * 2 }
        })
    }

    const handleChangeBetPlus = () => {
        if (state.bet > state.balance - 50) return null
        setState((prev) => {
            return { ...prev, bet: prev.bet + 50 }
        })
    }

    const handleChangeBetMin = () => {
        if (state.bet <= 100) return null
        setState((prev) => {
            return { ...prev, bet: prev.bet - 50 }
        })
    }
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.changeBet} onPress={halfBet}>
                <Text style={styles.textBet}>/2</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.changeBet}
                onPress={handleChangeBetMin}
            >
                <Text style={styles.textBet}>-50</Text>
            </TouchableOpacity>
            <Text style={styles.bet}>{state.bet}</Text>
            <TouchableOpacity
                style={styles.changeBet}
                onPress={handleChangeBetPlus}
            >
                <Text style={styles.textBet}>+50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeBet} onPress={doubleBet}>
                <Text style={styles.textBet}>X2</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: 340,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeBet: {
        width: 55,
        alignItems: 'center',
        height: '85%',
        backgroundColor: 'rgb(34,13,95)',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    bet: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gold'
    },
    textBet: {
        fontWeight: 'bold',
        color: 'gold',
        fontSize: 20
    }
})
