import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EventItem from '../../components/event/EventItem'

const AttendanceList = ({navigation}) => {
  const {authState, eventState, joinEvent} = useContext(AuthContext)
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
      <FlatList 
        data={eventState.events}
        renderItem={({item}) => <EventItem
                                    _id={item._id} 
                                    name={item.name}
                                    status={item.status ? "CLOSE" : "OPEN"}
                                    description={item.description}
                                    organization={item.organization.name}
        />
        
                    }
        keyExtractor={item => item._id}
      />
      <View style={styles.footer}>
        {visible ? (
          <View style={styles.inputModel}>
            <TextInput 
              style={styles.input}
              value={invitationPin}
              keyboardType='ascii-capable'
              placeholder="INVITATION PIN"
              maxLength={12}
              autoCorrect={false}
              onChangeText={text => setInvitationPin(text)}
              />

            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <AntDesign name='checkcircle' color={"green"} size={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.btn}>
              <AntDesign name='closecircle' color={"red"} size={40}/>
            </TouchableOpacity>
          </View>
        ) :
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.btn}>
            <Octicons name='diff-added' size={50}/>
          </TouchableOpacity>
        }
      </View>
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

export default AttendanceList