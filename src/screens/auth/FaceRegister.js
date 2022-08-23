import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import * as MediaLibrary from 'expo-media-library'

const FaceRegister = () => {
  const [cameraPermission, setCameraPermission] = useState()
  const [faceData, setFaceData] = useState([])
  const [images, setImages] = useState([])
  const cameraRef = useRef(null)

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync()
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
        if(smiling){
          takePicture()
        }
      })
    }
  }
  
  const takePicture = async() => {
    if(cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        setImages(prevArray => [...prevArray, data.uri])
        console.log(data)
      } catch (error) {
        console.log(error)
      }
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
        ref={cameraRef}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true
        }}>
        {getFaceDataView()}
      </Camera>
      {
        images.map((image, index)=>(
          <Text>{image}</Text>
        ))
      }
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20
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