import { BackHandler, Alert } from 'react-native';
import AuthProvider from './src/context/AuthContext';
import AppStack from './src/navigation/AppStack';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Confirmation", "Exit flexBox?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", 
          onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}
