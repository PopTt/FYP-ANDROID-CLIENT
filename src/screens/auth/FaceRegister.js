import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Camera } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'

const FaceRegister = () => {
  const [cameraPermission, setCameraPermission] = useState(null)
  const [faceData, setFaceData] = useState(null)

  useEffect(() => {
    async () => {
      
    }
  })

  return (
    <View>
      <Text>FaceRegister</Text>
    </View>
  )
}

export default FaceRegister