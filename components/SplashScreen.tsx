import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, Easing } from 'react-native';
import { Logo } from 'assets/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreenText } from 'assets/svg/SplashScreenText';

export const SplashScreen = () => {
  const translateY = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 40,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [translateY]);

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
