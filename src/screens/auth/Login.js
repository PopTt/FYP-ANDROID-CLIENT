import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
    backgroundColor: '#B3DDFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  }
})