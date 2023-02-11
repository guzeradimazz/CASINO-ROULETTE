import { Component } from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import { Constants } from '../Constants/Constants'
import { Reel } from './Reel'

export class ReelSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: null,
            height: null
        }
        this.reels = []
        this.reelsInMotion = null
        this.spinResults = []
        this.winningLines = []
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        })
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    highlight = (currentIdx) => {
        if (!this.winningLines.length) return null

        if (currentIdx > 0) {
            console.log(Constants.LINES[this.winningLines[currentIdx - 1]])
            try {
                Constants.LINES[this.winningLines[currentIdx - 1]].map((i) => {
                    this.reels[i[0]].highlightAtIdx(i[1], false)
                })
            } catch (error) {
                console.log('[LOG]' + error)
                return null
            }
        }

        if (currentIdx > this.winningLines - 1) return null

        try {
            Constants.LINES[this.winningLines[currentIdx]].map((i) => {
                this.reels[i[0]].highlightAtIdx(i[1], true)
                this.reels[i[0]].shakeAtIdx(i[1])
            })
        } catch (error) {
            console.log('[LOG]' + error)
            return null
        }

        this.props.setCasinoState((prev) => {
            return {
                ...prev,
                isWin: true
            }
        })

        setTimeout(() => {
            this.highlight(currentIdx + 1)

            this.props.setCasinoState((prev) => {
                return {
                    ...prev,
                    balance: prev.balance + prev.bet * 4.2
                }
            })
        }, 800)

        this.props.setCasinoState((prev) => {
            return {
                ...prev,
                isWin: false
            }
        })
    }

    evaluateResults = () => {
        this.winningLines = []
        for (let i = 0; i < Constants.LINES.length; i++) {
            let streak = 0
            let currentKind = null

            for (let j = 0; j < Constants.LINES[i].length; j++) {
                let coords = Constants.LINES[i][j]
                let symbolAtCoords = this.spinResults[coords[0]][coords[1]]

                if (j === 0) {
                    if (symbolAtCoords === 'D') break
                    currentKind = symbolAtCoords
                    streak = 1
                } else {
                    if (symbolAtCoords !== currentKind) break
                    streak += 1
                }
            }
            if (streak >= 3) this.winningLines.push(i)
        }
        console.log(this.winningLines)
        this.highlight(0)
    }

    spin = () => {
        this.reelsInMotion = Constants.COLS
        for (let i = 0; i < Constants.COLS; i++) {
            this.reels[i].scrollByOffset(
                this.randomBetween(
                    (Constants.REPEAT - 6) * this.reels[i].symbols.length,
                    (Constants.REPEAT - 5) * this.reels[i].symbols.length
                ),
                (reelIdx, res) => {
                    this.reelsInMotion -= 1
                    this.spinResults[reelIdx] = res

                    if (this.reelsInMotion === 0) this.evaluateResults()
                }
            )
        }
    }

    renderReels = () => {
        const reelWidth = this.state.width / Constants.COLS
        return (
            <>
                {Array.apply(null, Array(Constants.COLS)).map((i, idx) => (
                    <Reel
                        width={reelWidth}
                        height={this.state.height}
                        key={idx}
                        index={idx}
                        ref={(ref) => {
                            this.reels[idx] = ref
                        }}
                    />
                ))}
            </>
        )
    }

    render() {
        return (
            <View style={styles.reelSet} onLayout={this.onLayout}>
                {this.state.width && this.state.height && this.renderReels()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reelSet: {
        flex: 1,
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: 'gold',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(34,13,95,0.5)',
    }
})
