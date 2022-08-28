import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const AttendanceList = ({navigation}) => {
  const {logout, authState, eventState} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>AttendanceList</Text>
      <Text>{authState.firstName}{authState.username}</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>logout()}>
        <Text>logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('FaceRegisterScreen')}>
        <Text>Register your face</Text>
      </TouchableOpacity>
      <FlatList 
        data={eventState.events}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3DDFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  }
})

export default AttendanceList