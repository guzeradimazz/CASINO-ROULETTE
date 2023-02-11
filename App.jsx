import react from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './Components/HomeScreen'

import { StatusBar } from 'react-native'
import AppInner from './Components/AppInner'
const Stack = createNativeStackNavigator()

// const Sound = require('react-native-sound')

const AppPreWrapper = () => {
    react.useEffect(() => {
        StatusBar.setHidden(true)
    }, [])

    const [isGetBonus, setGetBonus] = react.useState(false)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name='Home'>
                    {(props) => 
                        <HomeScreen
                            {...props}
                            isGetBonus={isGetBonus}
                            setGetBonus={setGetBonus}
                        />
                    }
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name='App'>
                    {(props) => 
                        <AppInner
                            {...props}
                            isGetBonus={isGetBonus}
                            setGetBonus={setGetBonus}
                        />
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppPreWrapper
