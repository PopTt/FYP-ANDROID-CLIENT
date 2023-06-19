import { View, StyleSheet, Button, Alert, ActivityIndicator} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Location from 'expo-location';
import { useNavigation} from '@react-navigation/native'


const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
};

const getCurrentLocation = async () => {
  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
    timeout: 20000,
    maximumAge: 1000,
  });
  return coords;
};

const getIpAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const json = await response.json();
    return json.ip;
  } catch (err) {
    console.warn(err);
  }
};

const QrScanner = () => {
  const {authState, signAttendance} = useContext(AuthContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const route = useRoute()

  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);

  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const fetchLocationAndIpAddress = async () => {
      await getLocationPermission();
      const coords = await getCurrentLocation();
      setLocation(`${coords.latitude}, ${coords.longitude}`);
      const ipAddress = await getIpAddress();
      setIpAddress(ipAddress);
    };
    fetchLocationAndIpAddress();
  }, []);

  if (!location || !ipAddress || hasPermission == false) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
          <ActivityIndicator size={'large'}/>
      </View>
    );
  }

  const handleBarCodeScanned = async({ type, data }) => {
    if (!scanned){
      setScanned(true)
      if(data === JSON.stringify(route.params.event_id)){
        await signAttendance({
            event_id: route.params.event_id,
            user_id: authState.id,
            location: location || "",
            IPAddress: ipAddress || ""
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
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F9FB',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default QrScanner