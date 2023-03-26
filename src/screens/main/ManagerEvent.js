import ManagerAttendanceBottomTab from '../../navigation/ManagerAttendanceBottomTab'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const ManagerEvent = () => {
  const route = useRoute()
  return (
    //<Text>{route.params.event_id}</Text>
    <ManagerAttendanceBottomTab event_id={route.params.event_id}/>
  )
}

export default ManagerEvent