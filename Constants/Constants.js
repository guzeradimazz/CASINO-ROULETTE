import { Dimensions } from 'react-native'

export const Constants = {
    MAX_WIDTH: Dimensions.get('screen').width - 110,
    MAX_HEIGHT: Dimensions.get('screen').height,
    XR:Dimensions.get('screen').width/667,
    COLS: 5,
    ROWS: 3,
    REPEAT: 10,
    LINES: [
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0]
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1]
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 2]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 1],
            [4, 0]
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0],
            [3, 1],
            [4, 2]
        ],
        [
            [0, 0],
            [1, 2],
            [2, 0],
            [3, 2],
            [4, 0]
        ],
        [
            [0, 2],
            [1, 0],
            [2, 2],
            [3, 0],
            [4, 2]
        ],
        [
            [0, 1],
            [1, 0],
            [2, 1],
            [3, 0],
            [4, 1]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 0],
            [3, 1],
            [4, 0]
        ],
        [
            [0, 0],
            [1, 2],
            [2, 1],
            [3, 2],
            [4, 1]
        ],
        [
            [0, 2],
            [1, 1],
            [2, 2],
            [3, 1],
            [4, 2]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 0]
        ],
        [
            [0, 0],
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 1]
        ],
        [
            [0, 2],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 2]
        ],
        [
            [0, 1],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 1]
        ],
        [
            [0, 0],
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 2]
        ],
        [
            [0, 2],
            [1, 2],
            [2, 1],
            [3, 0],
            [4, 0]
        ]
    ]
}
