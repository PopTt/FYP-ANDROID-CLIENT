import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Register = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('LoginScreen')}>
        <Text>go to Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3DDFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  }
})