import React, {createContext, useState, useEffect, useReducer} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authStore, loginReducer} from './reducer/Auth'
import { attendanceStore, attendanceReducer } from './reducer/Attendance'

export const AuthContext =createContext()

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [authState, authDispatch] = useReducer(loginReducer, authStore)
    const [attendanceState, attendancesDispatch] = useReducer(attendanceReducer, attendanceStore)


    const login = async(values) =>{
        setIsLoading(true)

        AsyncStorage.setItem('id', values.id)
        AsyncStorage.setItem('firstName', values.firstName)
        AsyncStorage.setItem('lastName', values.lastName)
        AsyncStorage.setItem('email', values.email)
        AsyncStorage.setItem('token', values.token)

        authDispatch({
            type: 'LOGIN',
            id: values.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            token: values.token
        })

        Alert.alert("login successfully(test)")
        setIsLoading(false)
    }

    const logout = async() => {
        setIsLoading(true)
        authDispatch({type: 'LOGOUT'})
        attendancesDispatch({type: 'LOGOUT'})
        await AsyncStorage.removeItem('id')
        await AsyncStorage.removeItem('firstName')
        await AsyncStorage.removeItem('lastName')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('token')
        setIsLoading(false)
    }

    const isLogin = async() => {
        try {
            setIsLoading(true)
            let id = await AsyncStorage.getItem('id')
            let firstName = await AsyncStorage.getItem('firstName')
            let lastName= await AsyncStorage.getItem('lastName')
            let email = await AsyncStorage.getItem('email')
            let token = await AsyncStorage.getItem('token') 

            authDispatch({
                type: 'LOGIN',
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                token: token
            })
            //await getEvents()
            setIsLoading(false)
        }catch(e){
            console.log(`isLogin in error ${e}`)
        }
    }

    useEffect(() => {
        isLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ 
            setIsLoading,
            isLoading, 
            login,
            logout,
            authState, 
            attendanceState
        }}>
            {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider