import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginForm />
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('RegisterScreen')}>
        <Text>Back to Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

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