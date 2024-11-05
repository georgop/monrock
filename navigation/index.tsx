import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import { useAuth } from '../context/AuthContext';
import Home from 'screens/Home';
import { Booking } from 'screens/Booking';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Home: undefined;
  Login: undefined;
  Modal: undefined;
  Booking: { advertisingSpotId: number };
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
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
