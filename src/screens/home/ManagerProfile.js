import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const ManagerProfile = ({navigation}) => {
  const {logout, authState} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>USERNAME</Text>
        <View style={styles.type}>
          <Text style={styles.type_text}>{authState.username}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.type}>
          <Text style={styles.type_text}>{authState.email}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.label}>Account Type</Text>
        <View style={styles.type}>
          <Text style={styles.type_text}>{authState.acctype}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>logout()}>
        <Text style={styles.type_text}>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginHorizontal: 18,
    marginTop: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label:{
    color: 'black',
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
  type_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  },
  type: {
    padding: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
})

export default ManagerProfile