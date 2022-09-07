import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import {registerValidation} from '../auth/inputValidation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'

const RegisterForm = () => {
  const {register} = useContext(AuthContext)

  return (
    <Formik
        initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }}
        onSubmit={values => {
            register({values})
        }}
        validationSchema={registerValidation}
        >
        {({values, handleChange, handleBlur, errors, touched, isValid, handleSubmit})=>(
            
            <View style={styles.container}>
                <View style={styles.inner_container}>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput onChangeText={handleChange('username')}
                            style={styles.input}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Username"/>
                        {(errors.username && touched.username) &&
                            <Text style={styles.errorMsg}>{errors.username}</Text>
                        }
                        {(!errors.username && values.username!='') &&
                            <FontAwesome
                                name='check'
                                color='green'
                                size={15}/>
                        }
                    </View>

                    <View style={styles.inputField}>
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

                    <View style={styles.inputField}>
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
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput onChangeText={handleChange('confirmPassword')}
                            style={styles.input}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry={true}/>
                        {(errors.confirmPassword && touched.confirmPassword) &&
                            <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
                        }
                        {(!errors.confirmPassword && values.confirmPassword!='') &&
                            <FontAwesome
                                name='check'
                                color='green'
                                size={15}/>
                        }
                    </View>
                    <Button
                        color="#064C7F"
                        title="Register"
                        disabled={!isValid}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container:{
      marginTop: 20,
      borderWidth: 2
  },
  inner_container : {
    margin: 16
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
  inputField:{
      marginBottom: 15,
      width: 250
  },
  errorMsg:{
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5
  }
})

export default RegisterForm