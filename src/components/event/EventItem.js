import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const EventItem = ({name, status, description, style, organization, _id}) => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleClick = async() =>{
    setLoading(true)
    setLoading(false)
    navigation.navigate('EventScreen', {
      event_id: _id,
    })
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <TouchableOpacity onPress={handleClick}>
                    <MaterialIcons name='event-available' size={40} color='#6A77FC'/>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{color: style, fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif-condensed'}}>{status}</Text>
            </View>
        </View>
        <View style={styles.footer}>
            <ScrollView nestedScrollEnabled={true} style={styles.desc}>
                <Text style={styles.text}>{description}</Text>
            </ScrollView>
        </View>
        <View style={{alignItems: 'center'}}>
            <Text style={{color: '#3903BD', fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-condensed'}}>{organization}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginVertical: 10,
      marginHorizontal: 10,
      elevation: 6
    },
    header: {
      paddingStart: 20,
    },
    footer: {
      backgroundColor: 'white'
    },
    desc: {
      padding: 20,
      margin: 0,
      maxHeight: 120 
    },
    btn: {
      backgroundColor: '#654321',
      paddingHorizontal: 18,
      paddingVertical: 8
    },
    btnEnd: {
      backgroundColor: 'red',
      paddingHorizontal: 18,
      paddingVertical: 8
    },
    btnText: {
      color: 'green',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed'
    },
    title: {
      //color: '#064C7F',
      //color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed'
    },
    text: {
      color: 'black',
      fontSize: 18,
      fontFamily: 'sans-serif-condensed',
      textAlign: 'justify',
      overflow: 'scroll'
    },
  });

export default EventItem