import React, { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import { Logo } from 'assets/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreenText } from 'assets/svg/SplashScreenText';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

export const SplashScreen = () => {
  const translateY = useSharedValue(-300);

  useEffect(() => {
    translateY.value = withTiming(40, {
      duration: 1000,
      easing: Easing.bounce,
    });
  }, []);

  return (
    <LinearGradient colors={['#005AD0', '#05E1FF']} style={{ flex: 1 }}>
      <View className="flex flex-1 items-center justify-center">
        <View className="mt-[100px]">
          <Logo />
        </View>
        <View className="mt-[100px]">
          <SplashScreenText />
        </View>
        <Animated.View style={{ transform: [{ translateY }], marginTop: 100 }}>
          <Image
            source={require('../assets/image.png')}
            style={{ width: 180, height: 120 }}
            resizeMode="contain"
          />
        </Animated.View>
        <Image
          source={require('../assets/map.png')}
          style={{ width: 300, height: 150 }}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};
