import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment/moment'
import React, {useContext} from 'react'


const EventScreen = ({event_id}) => {
  const {authState, eventState} = useContext(AuthContext)
  const navigation = useNavigation()

  const targetEvent = eventState.events.find(item => {
    return item._id == event_id
  })

  const targetRecord = targetEvent.participants.find(item => {
    return item.id == authState.id
  })

  const handleClick = (type) =>{
    if(type === 'QR CODE') {
        navigation.navigate('QRCodeScannerScreen', {
            event_id: event_id,
          })
    }

    if(type === 'Face-Recognition'){
        navigation.navigate('FaceRecognitionScreen', {
            event_id: event_id,
          })
    }
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
      </View>
      <View style={{paddingBottom: 5}}>
        <ScrollView style={styles.bottom}>
          <Text style={styles.text}>{targetEvent.description}</Text>
        </ScrollView>
      </View>
      <View style={{
        padding: 20,
        justifyContent: 'center',
        marginVertical: 12,
        marginHorizontal: 16,
        elevation: 6,
        backgroundColor: targetRecord.status == 'Absent' ? '#F1948A' : '#7DCEA0'
      }}>
        <Text style={styles.record_title}>Attendance Record</Text>
        <Text style={styles.record_text}>STATUS : {targetRecord.status}</Text>
        <Text style={styles.record_text}>Joined Date : {
          moment(targetRecord.joinedDate)
              .utcOffset('+8:00')
              .format('YYYY-MM-DD hh:mm:ss a')}
        </Text>
        <Text style={styles.record_text}>Location : {targetRecord.location || 'UNDEFINED'}</Text>
        <Text style={styles.record_text}>IP Address : {targetRecord.IPAddress || 'UNDEFINED'}</Text>
      </View>
      {
        targetRecord.status === 'Absent' && (
            <View>
                <View style={{elevation: 3, backgroundColor: 'white'}}>
                    <Text style={{padding: 5, color: '#064C7F', fontSize: 18, fontWeight: 'bold', fontFamily: 'sans-serif-condensed'}}>
                        Flow to Take Attendance 
                    </Text>
                </View>
                <FlatList 
                    data={targetEvent.method}
                    renderItem={({item}) =>
                    <TouchableOpacity style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        //alignItems: 'center',
                        marginVertical: 8,
                        marginHorizontal: 16,
                        elevation: 6,
                        borderWidth: 1
                        }}
                        onPress={() => handleClick(item)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            item == 'QR CODE' ? (
                            <AntDesign name='qrcode' size={35} color='green'/>
                            ) : (
                            <MaterialCommunityIcons name='face-recognition' size={35} color='green'/>
                            )
                        }
                            <Text style={styles.method_text}>
                            {item}
                            </Text>
                        </View>
                        {
                        false ? (
                            <AntDesign name='checkcircle' size={50} color='green' />
                        ) : (
                            <AntDesign name='closecircle' size={50} color='red' />
                        )
                        }
                    </TouchableOpacity> 
                    }
                    keyExtractor={item => item._id}
                    />
                </View>
        )
      }
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

export default EventScreen