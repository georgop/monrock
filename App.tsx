import './global.css';
import 'react-native-gesture-handler';
import RootStack from './navigation';
import { useState } from 'react';
import { SplashScreen } from 'components/SplashScreen';
import { AuthProvider } from 'context/AuthContext';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);

  setTimeout(() => {
    setSplashScreenLoading(false);
  }, 2500);

  return (
    <AuthProvider>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
        {splashScreenLoading ? <SplashScreen /> : <RootStack />}
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;
