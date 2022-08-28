import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import {loginValidation} from '../auth/inputValidation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'

const LoginForm = () => {
  const {login} = useContext(AuthContext)

  return (
    <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        onSubmit={values => {
            login({values})
        }}
        validationSchema={loginValidation}
        >
        {({values, handleChange, handleBlur, errors, touched, isValid, handleSubmit})=>(
            <View style={styles.container}>
                <View style={styles.imputField}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput onChangeText={handleChange('email')}
                        style={styles.input}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Email"/>
                    {(errors.email && touched.email) &&
                        <Text style={styles.errorMsg}>{errors.email}</Text>
                    }
                    {(!errors.email && values.email!='') &&
                        <FontAwesome
                            name='check'
                            color='green'
                            size={15}/>
                    }
                </View>

                <View style={styles.imputField}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput onChangeText={handleChange('password')}
                        style={styles.input}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry={true}/>
                    {(errors.password && touched.password) &&
                        <Text style={styles.errorMsg}>{errors.password}</Text>
                    }
                    {(!errors.password && values.password!='') &&
                        <FontAwesome
                            name='check'
                            color='green'
                            size={15}/>
                    }
                </View>
                <Button
                    color="#064C7F"
                    title="LOGIN"
                    disabled={!isValid}
                    onPress={handleSubmit}
                />
            </View>
        )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container:{
      marginTop: 40
  },

  label:{
      color: '#064C7F',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom:5
  },
  input:{
    borderWidth: 1,
    borderColor: '#4e4e4e',
    padding: 5
  },
  imputField:{
      marginBottom: 15
  },
  errorMsg:{
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5
  }
})

export default LoginForm