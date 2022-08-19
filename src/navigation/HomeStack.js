import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AttendanceList from '../screens/home/AttendanceList'
import FaceRegister from '../screens/auth/FaceRegister'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='AttendanceListScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='AttendanceListScreen' component={AttendanceList}/>
        <Stack.Screen name='FaceRegisterScreen' component={FaceRegister}/>
    </Stack.Navigator>
  )
}

export default HomeStack