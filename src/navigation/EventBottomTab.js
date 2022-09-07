import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EventScreen from '../screens/event/EventScreen'
import ManagerList from "../screens/event/ManagerList";
import { AuthContext } from '../context/AuthContext'

const Tab = createBottomTabNavigator()

const EventBottomTab = ({event_id}) => {

  const {authState} = useContext(AuthContext)

  return (
    <Tab.Navigator
        initialRouteName={"EventDetailScreen"}
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'blue'
        }}>
        <Tab.Screen name="EventDetailScreen" options={{
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="event-note" color={color} size={size} />
          )
        }}>
            {() => <EventScreen event_id={event_id}/>}
        </Tab.Screen>
        <Tab.Screen name="ManagerList" options={{
          tabBarIcon: ({color, size})=>(
            <AntDesign name="profile" color={color} size={size}/>
          )
        }}>
            {() => <ManagerList event_id={event_id}/>}
        </Tab.Screen>
     </Tab.Navigator>
  )
}

export default EventBottomTab