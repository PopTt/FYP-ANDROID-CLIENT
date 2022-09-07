import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment/moment'
import React, {useContext} from 'react'


const ManagerList = ({event_id}) => {
  const {authState, eventState} = useContext(AuthContext)
  const route = useRoute()
  const navigation = useNavigation()

  const targetEvent = eventState.events.find(item => {
    return item._id == event_id
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backBtn}>
            <Ionicons name='chevron-back' color={"black"} size={40}/>
            <Text style={styles.back_text}>BACK</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <Text style={styles.title}>Manager List - {targetEvent.name}</Text>
        <View style={styles.type}>
          <Text style={styles.type_text}>{targetEvent.organization.name}</Text>
        </View>
      </View>
      <FlatList 
          data={targetEvent.managers}
          renderItem={({item}) =>
          <View style={{
              padding: 6,
              backgroundColor: 'white',
              alignItems: 'flex-start',
              elevation: 3,
              marginVertical: 8,
              marginHorizontal: 5
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='people-circle-sharp' size={50} color='green'/>
                <Text style={styles.method_text}>
                  {item.name || 'Ho Wai Lun'}
                </Text>
            </View>
            <Text style={styles.method_text}>
                  Joined Date : 
                  {
                    moment(item.createdDate)
                    .utcOffset('+8:00')
                    .format('YYYY-MM-DD hh:mm:ss a')
                  }
                </Text>
          </View> 
          }
          keyExtractor={item => item}
        />
    </SafeAreaView>
  )
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FB'
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
    maxHeight: 140
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
  method_text: {
    fontSize: 20,
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
  record_title: {
    color: '#064C7F',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  },
  record_text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    textTransform: 'uppercase',
    margin: 5
  },
})

export default ManagerList