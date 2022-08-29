import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FaceRegister from '../screens/auth/FaceRegister'
import Home from '../screens/main/Home'
import Event from '../screens/main/Event'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={Home}/>
        <Stack.Screen name='FaceRegisterScreen' component={FaceRegister}/>
        <Stack.Screen name='EventScreen' component={Event}/>
    </Stack.Navigator>
  )
}

export default HomeStack