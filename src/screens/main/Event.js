import EventBottomTab from "../../navigation/EventBottomTab"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const Event = () => {
  const route = useRoute()
  return (
    //<Text>{route.params.event_id}</Text>
    <EventBottomTab event_id={route.params.event_id}/>
  )
}

export default Event