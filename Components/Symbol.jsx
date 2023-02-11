import { Component } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { images } from '../Constants/Images'
import FastImage from 'react-native-fast-image'

export class Symbol extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: true,
            animatedValue: new Animated.Value(0),
            imageForView: null
        }
    }

    setActive = (active) => {
        this.setState({
            active: active
        })
    }

    shake = () => {
        this.state.animatedValue.setValue(0)
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true
        }).start()
    }

    render() {
        let symbolAnimation = [
            {
                scale: this.state.animatedValue.interpolate({
                    inputRange: [0, 0.25, 0.5, 1],
                    outputRange: [1, 1.25, 0.75, 1]
                })
            },
            {
                rotate: this.state.animatedValue.interpolate({
                    inputRange: [
                        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1
                    ],
                    outputRange: [
                        '0deg',
                        '15deg',
                        '0deg',
                        '-15deg',
                        '0deg',
                        '15deg',
                        '0deg',
                        '-15deg',
                        '0deg',
                        '15deg',
                        '0deg'
                    ]
                })
            }
        ]
        return (
            <View
                style={[
                    styles.symbol,
                    { width: this.props.width, height: this.props.height }
                ]}
            >
                <Animated.Image
                    style={{
                        width: this.props.width - 30,
                        height: this.props.height - 30,
                        opacity: this.state.active ? 1 : 0.3,
                        transform: symbolAnimation
                    }}
                    resizeMode='contain'
                    source={this.props.symbol}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    symbol: {
        padding: 10
    }
})
