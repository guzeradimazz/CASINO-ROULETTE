import { Component } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { Constants } from '../Constants/Constants'
import { Symbol } from './Symbol'
import { images } from '../Constants/Images'

export class Reel extends Component {
    constructor(props) {
        super(props)
        this.symbols = 'ABKKEEHHJJ'
        // this.symbols = 'AFABCDDEEFFBKKGBIIIFFAFBG'
        this.symbolsRepeat = this.symbols.repeat(Constants.REPEAT).split('')
        this.symbolsHeight = this.props.height / Constants.ROWS

        this.symbolsRefs = []

        this.position = this.symbolsRepeat.length - Constants.ROWS
        this.state = {
            scrollPos: new Animated.Value(0)
        }
        this.currentScrollPos = this.position * this.symbolsHeight * -1
    }

    shakeAtIdx = (idx) => {
        this.symbolsRefs[this.position + idx].shake()
    }

    highlightAtIdx = (idx, highlight) => {
        this.symbolsRefs[this.position + idx].setActive(highlight)
    }

    scrollByOffset = (offset, callback) => {
        for (let i = 0; i < Constants.ROWS; i++) {
            this.symbolsRefs[this.position + i].setActive(true)
        }

        this.currentScrollPos =
            this.currentScrollPos + this.symbolsHeight * offset

        this.position = this.position - offset
        Animated.timing(this.state.scrollPos, {
            toValue: this.currentScrollPos,
            duration: 750 + this.props.index * 250,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.exp)
        }).start(() => {
            this.position =
                (Constants.REPEAT - 2) * this.symbols.length +
                (this.position % this.symbols.length)
            let results = []

            for (let i = 0; i < Constants.ROWS; i++) {
                this.symbolsRefs[this.position + i].setActive(false)
                results.push(this.symbolsRepeat[this.position + i])
            }

            this.currentScrollPos = this.position * this.symbolsHeight * -1
            this.state.scrollPos.setValue(this.currentScrollPos)

            callback(this.props.index, results)
        })
    }
    shouldComponentUpdate() {
        return false
    }

    getImage = (i) => {
        switch (i) {
            case 'A':
                return images.fruit1
            case 'B':
                return images.fruit2
            case 'C':
                return images.fruit3
            case 'D':
                return images.fruit4
            case 'E':
                return images.fruit5
            case 'F':
                return images.fruit6
            case 'G':
                return images.fruit7
            case 'H':
                return images.fruit8
            case 'I':
                return images.fruit9
            case 'J':
                return images.fruit10
            case 'K':
                return images.fruit11
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.reel,
                    {
                        width: this.props.width,
                        height: this.props.height,
                        borderLeftWidth: this.props.index === 0 ? 0 : 1,
                        borderLeftColor: this.props.index === 0 ? 'transparent' : 'gold'
                    }
                ]}
            >
                <Animated.View
                    style={{
                        width: this.props.width,
                        height: this.symbolsRepeat.length * this.symbolsHeight,
                        transform: [{ translateY: this.state.scrollPos }]
                    }}
                >
                    {this.symbolsRepeat.map((i, idx) => {
                        return (
                            <Symbol
                                symbol={this.getImage(i)}
                                key={idx}
                                index={idx}
                                width={this.props.width}
                                height={this.symbolsHeight}
                                ref={(ref) => (this.symbolsRefs[idx] = ref)}
                            />
                        )
                    })}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reel: {
        overflow: 'hidden'
    }
})
