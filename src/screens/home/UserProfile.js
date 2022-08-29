import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const UserProfile = ({navigation}) => {
  const {logout, authState} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>USERNAME :</Text>
        <Text style={styles.text}>{authState.username}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.text}>{authState.email}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>logout()}>
        <Text>logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('FaceRegisterScreen')}>
        <Text>Register your face</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6FCE8',
    justifyContent: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
  label:{
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: 10
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 15,
    fontFamily: 'serif'
  },
})

export default UserProfile