import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import AttendanceMemberList from "../screens/attendance/AttendanceMemberList";
import AttendanceQRCode from "../screens/attendance/AttendanceQRCode";
import { AuthContext } from '../context/AuthContext'

const Tab = createBottomTabNavigator()

const ManagerAttendanceBottomTab = ({event_id}) => {

  const {authState} = useContext(AuthContext)

  return (
    <Tab.Navigator
        initialRouteName={"AttendanceScreen"}
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'blue'
        }}>
        <Tab.Screen name="AttendanceScreen" options={{
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="event-note" color={color} size={size} />
          )
        }}>
            {() => <AttendanceMemberList event_id={event_id}/>}
        </Tab.Screen>

        <Tab.Screen name="QRCodeScreen" options={{
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="qr-code" color={color} size={size} />
          )
        }}>
            {() => <AttendanceQRCode event_id={event_id}/>}
        </Tab.Screen>
     </Tab.Navigator>
  )
}

export default ManagerAttendanceBottomTab