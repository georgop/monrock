import { ScreenContent } from 'components/ScreenContent';
import { useAuth } from 'context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { Platform, Touchable } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

export default function Modal() {
  const { logout } = useAuth();
  return (
    <>
      <ScreenContent path="screens/modal.tsx" title="Modal" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </>
  );
}
