import React, {createContext, useState, useEffect, useReducer} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { instance } from '../axios/Instance'
import { authStore, loginReducer} from './reducer/Auth'
import { eventStore, eventReducer } from './reducer/Event'

export const AuthContext =createContext()

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [authState, authDispatch] = useReducer(loginReducer, authStore)
    const [eventState, eventDispatch] = useReducer(eventReducer, eventStore)


    const register = async({values}) => {
        setIsLoading(true)
        const response = await instance.post('auth/register', 
        values
        ).catch(err => {
            if(err && err.response) {
                Alert.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            Alert.alert(response.data.message)
        }
        setIsLoading(false)
    }

    const login = async({values}) =>{
        setIsLoading(true)

        values.type = "participant"
        const response = await instance.post('auth/login', 
        values
        ).catch(err => {
            if(err && err.response) {
                Alert.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            AsyncStorage.setItem('id', response.data.data._id)
            AsyncStorage.setItem('username', response.data.data.username)
            AsyncStorage.setItem('email', response.data.data.email)
            AsyncStorage.setItem('type', response.data.data.type)
            //AsyncStorage.setItem('token', values.token)

            authDispatch({
                type: 'LOGIN',
                id: response.data.data._id,
                username: response.data.data.username,
                email: response.data.data.email,
                acctype: response.data.data.type
            })
            //console.log(response.data.data._id)
            getEvents()
            Alert.alert(response.data.message)
        }
        
        setIsLoading(false)
    }

    const logout = async() => {
        setIsLoading(true)
        authDispatch({type: 'LOGOUT'})
        eventDispatch({type: 'LOGOUT'})
        await AsyncStorage.removeItem('id')
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('type')
        //await AsyncStorage.removeItem('token')
        setIsLoading(false)
    }

    const getEvents = async() => {
        try {
            setIsLoading(true)
            let id = await AsyncStorage.getItem('id')

            const response = await instance.get('data/getEventByUserID/'+ id, 
            ).catch(err => {
                if(err && err.response) {
                    Alert.alert(err.response.data.message)
                }
            })

            if(response && response.data) {
                eventDispatch({
                    type: 'RETRIEVE_EVENTS',
                    events: response.data.data
                })
            }
            setIsLoading(false)
        } catch (e) {
            console.log(`getEvents in error ${e}`)
        }
    }

    const joinEvent = async(invitationPin) => {
        setIsLoading(true)
        let id = await AsyncStorage.getItem('id')

        const response = await axiosInstance.post('participant/join',
        {
            'user_id': id,
            'invitation_code': invitationPin
        }
        ).catch(err => {
            if(err && err.response) {
                Alert.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            getEvents()
            Alert.alert(response.data.message)
        }
        setIsLoading(false)   
    }

    const isLogin = async() => {
        try {
            setIsLoading(true)
            let user_id = await AsyncStorage.getItem('id')
            let username = await AsyncStorage.getItem('username')
            let email = await AsyncStorage.getItem('email')
            let type = await AsyncStorage.getItem('type') 

            authDispatch({
                type: 'LOGIN',
                id: user_id,
                username: username,
                email: email,
                acctype: type
            })
            await getEvents()
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
            register, 
            login,
            getEvents,
            joinEvent,
            logout,
            authState, 
            eventState
        }}>
            {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider