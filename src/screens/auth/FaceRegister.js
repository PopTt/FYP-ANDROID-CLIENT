import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Modal } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as FaceDetector from 'expo-face-detector'
import * as MediaLibrary from 'expo-media-library'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const FaceRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [cameraPermission, setCameraPermission] = useState()
  const [faceData, setFaceData] = useState([])
  const [faceDetected, setFaceDetected] = useState(false)
  const eyesBlinkCount = useRef(0)
  const cameraRef = useRef(null)
  const detectorRef = useRef(null);
  const navigation = useNavigation()


  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
      if (detectorRef.current) {
        detectorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      //MediaLibrary.requestPermissionsAsync()
      const {status} = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(status === "granted")
    })()
  }, [])

  // useEffect(() => {
  //   console.log(images);
  // }, [images]);

//   async function saveToAlbum(uri) {
//   
//   const { status } = await MediaLibrary.requestPermissionsAsync();
//   if (status === 'granted') {
//    
//     const asset = await MediaLibrary.createAssetAsync(uri);
//     console.log('Photo saved to album:', asset.uri);
//   } else {
//     console.log('Permission to access album was denied');
//   }
// }

  // const takePicture = async() => {
  //   if(cameraRef.current) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync()
  //       //setImages(prevArray => [...prevArray, data.uri])
  //       console.log(data)
  //       await saveToAlbum(data.uri)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setShowModal(true)
        let photos = [];
        //Alert.alert('Do not move your face')
        for (let i = 0; i < 20; i++) {
          if(eyesBlinkCount.current < 3){
            break;
          }else{
            const data = await cameraRef.current.takePictureAsync();
            photos.push(data.uri);
          }
        }
        console.log(photos)
        setShowModal(false)
        if(photos.length >= 20)
          Alert.alert('Register successfully')
        else
          Alert.alert('fail to register')


        eyesBlinkCount.current = 0
        //setImages(photos);
        // send photos to server
        //await sendPhotos(photos);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if(faceData.length !== 0){
      setFaceDetected(true)
      /*faceData.map((face, index) => {
        const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
        const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
        const smiling = face.smilingProbability > 0.7;
        if(winking){
          setEyesBlink(eyesBlink+1)
        }
      })*/
      //if(faceData.leftEyeOpenProbability < 0.4 && faceData.rightEyeOpenProbability < 0.4){

      //}
      faceData.map((face, index) => {
        if(face.leftEyeOpenProbability < 0.1 && face.rightEyeOpenProbability < 0.1 && eyesBlinkCount.current < 3){
          //console.log(face.leftEyeOpenProbability)
          eyesBlinkCount.current = eyesBlinkCount.current + 1
          if(eyesBlinkCount.current >= 3)
            takePicture()
        }
      })
    }else{
      setFaceDetected(false)
      eyesBlinkCount.current = 0
    }
  })

  if(cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFacesDetected = ({faces}) => {
    setFaceData(faces)
    //console.log(faces)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backBtn}>
            <Ionicons name='chevron-back' color={"black"} size={40}/>
            <Text style={styles.back_text}>BACK</Text>
        </TouchableOpacity>
      </View>
      <Camera 
        type={Camera.Constants.Type.front}
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        ratio={'5:4'}
        ref={cameraRef}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true
        }}>
      </Camera>

      <Modal visible={showModal} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Warning: DO NOT MOVE YOUR FACE</Text>
        </View>
      </View>
        
      </Modal>

      <View style={styles.footer}>
        <View style={styles.footer_container}>
          <View style={styles.checkBox}>
            <Text style={styles.checkBox_text}>FACE DETECTED</Text>
            {
              faceDetected ? (
                <AntDesign name='checkcircle' size={50} color='green' />
              ) : (
                <AntDesign name='closecircle' size={50} color='red' />
              )
            }
          </View>
          <View style={styles.checkBox}>
            <Text style={styles.checkBox_text}>EYES BLINK</Text>
            {
              eyesBlinkCount.current >= 3 ? (
                <AntDesign name='checkcircle' size={50} color='green' />
              ) : (
                <Text style={styles.eyesblink_text}>{eyesBlinkCount.current}</Text>
              )
            }
          </View>
          <View style={styles.checkBox}>
            <Text style={styles.checkBox_text}>FACE RECOGNITION</Text>
            {
              false ? (
                <AntDesign name='checkcircle' size={50} color='green' />
              ) : (
                <AntDesign name='closecircle' size={50} color='red' />
              )
            }
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 0.8,
    aspectRatio: 0.8,
  },
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
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
  },
  backBtn: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 0
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  back_text: {
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold'
  },
  footer: {
    flex: 0.2,
  },
  footer_container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBox: {
    alignItems: 'center',
    margin: 5
  },
  checkBox_text: {
    color: "green", 
    fontSize: 16, 
    fontWeight: 'bold', 
    fontFamily: 'sans-serif-condensed',
    margin: 3
  },
  eyesblink_text: {
    color: "red", 
    fontSize: 35, 
    fontWeight: 'bold', 
    fontFamily: 'sans-serif-condensed',
    margin: 3
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: "red", 
    fontSize: 28, 
    fontWeight: 'bold', 
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
  }
})
export default FaceRegister


// const takePicture = async () => {
//   if (cameraRef) {
//     try {
//       let photos = [];
//       for (let i = 0; i < 30; i++) {
//         const data = await cameraRef.current.takePictureAsync();
//         photos.push(data.uri);
//       }
//       // send photos to server
//       await sendPhotos(photos);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// const sendPhotos = async (photos) => {
//   try {
//     const response = await fetch('<your_server_url>', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         photos: photos
//       })
//     });
//     const data = await response.json();
//     // handle server response
//   } catch (error) {
//     console.log(error);
//   }
// }