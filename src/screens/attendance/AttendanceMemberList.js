import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment/moment'
import React, {useContext} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'


const AttendanceMemberList = () => {
  const route = useRoute()
  const {authState, eventState, openEvent, closeEvent, updateAttendance} = useContext(AuthContext)
  const navigation = useNavigation()

  const targetEvent = eventState.events.find(item => {
    return item._id == route.params.event_id
  })

  const clickOpenEvent = () =>{
    openEvent(route.params.event_id)
  }

  const clickCloseEvent = () =>{
    closeEvent(route.params.event_id)
  }

  const clickUpdateAttendance = async(user_id, status) =>{
    await updateAttendance(route.params.event_id, user_id, status)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backBtn}>
            <Ionicons name='chevron-back' color={"black"} size={40}/>
            <Text style={styles.back_text}>BACK</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <Text style={styles.title}>{targetEvent.name}</Text>
        <View style={styles.type}>
          <Text style={styles.type_text}>{targetEvent.organization.name}</Text>
        </View>
        {
          targetEvent.status ? 
          (
            <View style={styles.close_type}>
              <Text style={styles.type_text}>CLOSE</Text>
            </View>
          ) : 
          (
            <View style={styles.type}>
              <Text style={styles.type_text}>OPEN</Text>
            </View>
          )
        }
        {
          targetEvent.status ? 
          (
            <View style={styles.open}>
              <TouchableOpacity onPress={clickOpenEvent} style={styles.rowBtn}>
                  <FontAwesome name='unlock' color={"white"} size={22}/>
              </TouchableOpacity>
            </View>
          ) : 
          (
            <View style={styles.close}>
              <TouchableOpacity onPress={clickCloseEvent} style={styles.rowBtn}>
                  <FontAwesome name='lock' color={"white"} size={22}/>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
      <View style={{paddingBottom: 5}}>
        <ScrollView style={styles.bottom}>
          <Text style={styles.text}>{targetEvent.description}</Text>
        </ScrollView>
      </View>
      <View style={{elevation: 3, backgroundColor: 'white'}}>
          <Text style={{padding: 5, color: '#064C7F', fontSize: 18, fontWeight: 'bold', fontFamily: 'sans-serif-condensed'}}>
                Attendance List
          </Text>
      </View>

      <FlatList 
                    data={targetEvent.participants}
                    renderItem={({item}) =>
                        <View style={{
                          padding: 20,
                          justifyContent: 'center',
                          marginVertical: 12,
                          marginHorizontal: 16,
                          elevation: 6,
                          backgroundColor: item.status == 'Absent' ? '#F1948A' : '#7DCEA0'
                        }}>
                          <Text style={styles.record_title}>Attendance Record</Text>
                          <Text style={styles.record_text}>Name : {item.name}</Text>
                          <View style={styles.rowBtn}>
                            <Text style={styles.record_text}>STATUS : {item.status}</Text>
                            {
                              item.status === "Absent" ? 
                              (
                                <TouchableOpacity onPress={() => clickUpdateAttendance(item.id, "Attend")}>
                                    <FontAwesome name='edit' color={"white"} size={30}/>
                                </TouchableOpacity>
                              ):
                              (
                                <TouchableOpacity onPress={() => clickUpdateAttendance(item.id, "Absent")}>
                                    <FontAwesome name='edit' color={"white"} size={30}/>
                                </TouchableOpacity>
                              )
                            }
                          </View>
                          <Text style={styles.record_text}>Joined Date : {
                            moment(item.joinedDate)
                                .utcOffset('+8:00')
                                .format('YYYY-MM-DD hh:mm:ss a')}
                          </Text>
                          <Text style={styles.record_text}>Location : {item.location || 'UNDEFINED'}</Text>
                          <Text style={styles.record_text}>IP Address : {item.IPAddress || 'UNDEFINED'}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
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
  rowBtn: {
    flexDirection: 'row',
    paddingHorizontal: 10
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
  close_type: {
    padding: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  close: {
    borderRadius: 18,
    padding: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  open: {
    borderRadius: 18,
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

export default AttendanceMemberList