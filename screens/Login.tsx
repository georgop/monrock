import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Animated,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [pin, setPin] = useState('');
  const inputRef = useRef<TextInput>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handlePinChange = (value: string) => {
    if (value.length <= 4) setPin(value);
  };

  const handleShakeAnimation = () => {
    shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = () => {
    if (pin.length === 4 && pin === '1234') {
      login();
    } else {
      handleShakeAnimation();
    }
  };

  return (
    <LinearGradient colors={['#005AD0', '#05E1FF']} style={{ flex: 1 }}>
      <View className="flex w-screen flex-1 items-center justify-around">
        <View className="flex h-[60%] w-full items-center justify-around">
          <Text className="mt-[50px] text-[48px] font-semibold text-[#D0E4FF]">Welcome!</Text>
          <View>
            <Text
              className="text-center text-[20px] font-semibold text-[#FFFFFF]"
              numberOfLines={1}>
              Enter your pin
            </Text>
            <Text
              className="text-center text-[20px] font-semibold text-[#FFFFFF]"
              numberOfLines={1}>
              and start navigating
            </Text>
          </View>
          <Pressable
            className="items-center justify-center"
            onPress={() => {
              inputRef.current?.focus();
            }}>
            <TextInput
              ref={inputRef}
              className="absolute -left-96"
              keyboardType="numeric"
              value={pin}
              onChangeText={handlePinChange}
              maxLength={4}
              inputMode="numeric"
            />

            <Animated.View
              style={{
                flexDirection: 'row',
                gap: 12,
                transform: [{ translateX: shakeAnimation }],
              }}>
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <Text className="text-[24px] text-gray-800">{pin[index] || ''}</Text>
                </View>
              ))}
            </Animated.View>
          </Pressable>
          <TouchableOpacity
            className="mt-4 rounded-full rounded-lg border-[1px] border-[#FFFFFF] bg-[#005AD0] px-6 py-3"
            onPress={handleLogin}>
            <Text className="text-[18px] font-bold text-[#FFFFFF]">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="h-[10%]"></View>
        <View className="flex h-[30%] items-center justify-around">
          <View className="flex items-center">
            <Text className="text-[16px] font-semibold text-[#FFFFFF]">Forgot Pin?</Text>
            <TouchableOpacity>
              <Text className="text-[16px] font-semibold text-[#005AD0]">Reset</Text>
            </TouchableOpacity>
          </View>
          <View className="flex items-center">
            <Text className="text-[16px] font-semibold text-[#FFFFFF]">Create an account?</Text>
            <TouchableOpacity>
              <Text className="text-[16px] font-semibold text-[#005AD0]">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;
