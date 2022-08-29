import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import UserProfile from '../screens/home/UserProfile'
import AttendanceList from '../screens/home/AttendanceList'
import { AuthContext } from '../context/AuthContext'

const Tab = createBottomTabNavigator()

const HomeBottomTab = () => {

  const {authState} = useContext(AuthContext)

  return (
    <Tab.Navigator
        initialRouteName={"EventListScreen"}
        screenOptions={{
            headerShown: true,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'blue'
        }}>
        <Tab.Screen name={"EventListScreen"} component={AttendanceList} options={{
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="event-note" color={color} size={size} />
          )
        }}/>
        <Tab.Screen name={"userProfile"} component={UserProfile} options={{
          tabBarIcon: ({color, size})=>(
            <AntDesign name="profile" color={color} size={size}/>
          )
        }}/>
     </Tab.Navigator>
  )
}

export default HomeBottomTab