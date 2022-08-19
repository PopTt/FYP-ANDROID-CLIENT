import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const testUser = {
    id: "2001430",
    firstName: "alan",
    lastName: "ho",
    email: "alanhoablan@gmail.com",
    token: "1s12s21s2esw21"
}

const LoginForm = () => {
  const {login} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>LoginForm</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>login(testUser)}>
        <Text>Login(Test)</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: '#B3DDFC',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange',
      padding: 10
    }
  })