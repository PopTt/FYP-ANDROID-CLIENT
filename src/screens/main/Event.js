import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, {useContext} from 'react'


const Event = () => {
  const {eventState} = useContext(AuthContext)
  const route = useRoute()
  const navigation = useNavigation()

  const targetEvent = eventState.events.find(item => {
    return item._id == route.params.event_id
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backBtn}>
            <Ionicons name='chevron-back' color={"black"} size={40}/>
            <Text style={styles.back_text}>BACK</Text>
        </TouchableOpacity>
      </View>
      <Text>{targetEvent._id}</Text>
    </SafeAreaView>
  )
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E4FD'
  },
  backBtn: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 0
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  middle: {
    paddingStart: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  bottom: {
    padding: 20,
    margin: 0,
    maxHeight: 150
  },
  title: {
    color: '#064C7F',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  },
  type: {
    padding: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  type_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  },
  back_text: {
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold'
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    textAlign: 'justify',
    overflow: 'scroll'
  },
})

export default Event