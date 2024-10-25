import './global.css';

import 'react-native-gesture-handler';

import RootStack from './navigation';
import { useState } from 'react';
import { Text } from 'react-native';
import { SplashScreen } from 'components/SplashScreen';

const App = () => {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);

  setTimeout(() => {
    setSplashScreenLoading(false);
  }, 3000);

  if (splashScreenLoading) {
    return <SplashScreen />;
  }

  return <RootStack />;
};

export default App;
