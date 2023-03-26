import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation} from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const AttendanceQRCode = ({event_id}) => {
  const navigation = useNavigation()
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.1}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backBtn}>
            <Ionicons name='chevron-back' color={"black"} size={40}/>
            <Text style={styles.back_text}>BACK</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
        <QRCode
          value={JSON.stringify(event_id)}
          size={Math.min(width, height) * 0.8}
          color='black'
          backgroundColor='white'
        />
      </View>
      
    </SafeAreaView>
  )
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FB'
  },
  backBtn: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 0
  },
  back_text: {
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold'
  }
})

export default AttendanceQRCode