import { View, ActivityIndicator } from 'react-native'
import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import HomeStack from './HomeStack'
import AuthStack from './AuthStack'


const AppStack = () => {
    const {isLoading, authState} = useContext(AuthContext)

    if(isLoading) {
      return (
          <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
              <ActivityIndicator size={'large'}/>
          </View>
      )
    }
  
    return (
      <NavigationContainer>
          {authState.token === null ? <AuthStack/> : <HomeStack />}
      </NavigationContainer>
    )
}

export default AppStack