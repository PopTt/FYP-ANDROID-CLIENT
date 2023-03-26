import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ManagerProfile from "../screens/home/ManagerProfile";
import ManagerAttendanceList from "../screens/home/ManagerAttendanceList";
import { AuthContext } from '../context/AuthContext'

const Tab = createBottomTabNavigator()

const ManagerHomeBottomTab = () => {

  const {authState} = useContext(AuthContext)

  return (
    <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={{
            headerShown: true,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'blue'
        }}>
        <Tab.Screen name={"Home"} component={ManagerAttendanceList} options={{
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="event-note" color={color} size={size} />
          )
        }}/>
        <Tab.Screen name={"Manager Profile"} component={ManagerProfile} options={{
          tabBarIcon: ({color, size})=>(
            <AntDesign name="profile" color={color} size={size}/>
          )
        }}/>
     </Tab.Navigator>
  )
}

export default ManagerHomeBottomTab