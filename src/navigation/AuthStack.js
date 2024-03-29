import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='RegisterScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='LoginScreen' component={Login}/>
        <Stack.Screen name='RegisterScreen' component={Register}/>
    </Stack.Navigator>
  )
}

export default AuthStack