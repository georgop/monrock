import './global.css';

import 'react-native-gesture-handler';

import RootStack from './navigation';
import { useState } from 'react';
import { SplashScreen } from 'components/SplashScreen';
import { AuthProvider } from 'context/AuthContext';

const App = () => {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);

  setTimeout(() => {
    setSplashScreenLoading(false);
  }, 3000);

  if (splashScreenLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
};

export default App;
