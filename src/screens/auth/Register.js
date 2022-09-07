import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

const Register = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <RegisterForm />
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
    backgroundColor: '#F1F9FB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  title: {
    //color: '#064C7F',
    //color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  },
})