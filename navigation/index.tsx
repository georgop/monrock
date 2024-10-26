import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './drawer-navigator';
import Modal from '../screens/modal';
import Login from '../screens/Login';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Modal: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen
              name="Modal"
              component={Modal}
              options={{ presentation: 'modal', headerLeft: () => null }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
