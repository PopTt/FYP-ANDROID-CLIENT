import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EventItem from '../../components/event/EventItem'

const ManagerAttendanceList = ({navigation}) => {
  const {authState, eventState, joinEvent, getEventsManager} = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const [invitationPin, setInvitationPin] = useState('')

  const handleSubmit = () => {
    if(invitationPin.length > 1) {
      joinEvent(invitationPin)
      setInvitationPin('')
      setVisible(!visible)
    } else{
      Alert.alert("INVITATION Pin cannot be empty")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getEventsManager()} style={{alignItems: 'center'}}>
        <FontAwesome name='refresh' size={30} />
      </TouchableOpacity>
      <FlatList 
        data={eventState.events}
        renderItem={({item}) => <EventItem
                                    _id={item._id} 
                                    name={item.name}
                                    status={item.status ? "CLOSE" : "OPEN"}
                                    style={item.status ? "red" : "green"}
                                    description={item.description}
                                    organization={item.organization.name}
        />
        
                    }
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 8
  },
  inputModel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10

  },
  input:{
    borderWidth: 1,
    borderColor: '#4e4e4e',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
})

export default ManagerAttendanceList