import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Camera } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'

const FaceRegister = () => {
  const [cameraPermission, setCameraPermission] = useState()
  const [faceData, setFaceData] = useState([])

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(status === "granted")
    })()
  }, [])

  if(cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }


  function getFaceDataView(){
    if(faceData.length !== 0){
      faceData.map((face, index) => {
        const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
        const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
        const smiling = face.smilingProbability > 0.7;
        console.log(smiling)
        
      })
    }
  }
  
  const handleFacesDetected = ({faces}) => {
    setFaceData(faces)
    //console.log(faces)
  }

  return (
    <View style={styles.container}>
      <Camera 
        type={Camera.Constants.Type.front}
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        ratio={'4:3'}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true
        }}>
        {getFaceDataView()}
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faces: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  faceDesc: {
    fontSize: 20
  }
})
export default FaceRegister