import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FaceRegister from '../screens/auth/FaceRegister'
import FaceScanner from '../screens/attendance/FaceScanner'
import QrCodeScanner from '../screens/attendance/QrCodeScanner'
import Home from '../screens/main/Home'
import Event from '../screens/main/Event'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={Home}/>
        <Stack.Screen name='FaceRegisterScreen' component={FaceRegister}/>
        <Stack.Screen name='EventScreen' component={Event}/>
        <Stack.Screen name='FaceRecognitionScreen' component={FaceScanner}/>
        <Stack.Screen name='QRCodeScannerScreen' component={QrCodeScanner}/>
    </Stack.Navigator>
  )
}

export default HomeStack