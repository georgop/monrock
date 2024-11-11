import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import { useAuth } from '../context/AuthContext';
import { Home } from 'screens/Home';
import { Booking } from 'screens/Booking';
import { MediaLibrary } from 'screens/MediaLibrary';
import { History } from 'screens/History';
import { Scheduled } from 'screens/Scheduled';
import { Account } from 'screens/Account';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Home: undefined;
  Login: undefined;
  Modal: undefined;
  Booking: { advertisingSpotId: number };
  MediaLibrary: undefined;
  History: undefined;
  Scheduled: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="MediaLibrary" component={MediaLibrary} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Scheduled" component={Scheduled} />
            <Stack.Screen name="Account" component={Account} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
