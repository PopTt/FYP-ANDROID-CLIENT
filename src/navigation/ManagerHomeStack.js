import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ManagerHome from '../screens/main/ManagerHome'
import AttendanceMemberList from '../screens/attendance/AttendanceMemberList';

const Stack = createNativeStackNavigator();

const ManagerHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={ManagerHome}/>
        <Stack.Screen name='EventScreen' component={AttendanceMemberList}/>
    </Stack.Navigator>
  )
}

export default ManagerHomeStack