import { View, StyleSheet, Button, Alert } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Location from 'expo-location';

const QrCodeScanner = () => {
  const {authState, signAttendance} = useContext(AuthContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [address, setAddress] = useState(null)
  const [scanned, setScanned] = useState(false);
  const route = useRoute()

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
  
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
        setAddress(address);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await CheckIfLocationEnabled()
      await GetCurrentLocation()
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission == false){
    Alert.alert("No access to camera")
  }

  const handleBarCodeScanned = async({ type, data }) => {
    if (!scanned){
      setScanned(true)
      if(data === JSON.stringify(route.params.event_id)){
        await signAttendance({
            event_id: route.params.event_id,
            user_id: authState.id,
            location: address || "",
            IPAddress: ""
          })
      }else{
        Alert.alert("Invalid QR Code")
      } 
    }
  }
  return (
    <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F9FB',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default QrCodeScanner