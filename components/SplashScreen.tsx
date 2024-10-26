import React, { useEffect, useRef } from 'react';
import { Animated, View, Image } from 'react-native';
import { Logo } from 'assets/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreenText } from 'assets/SplashScreenText';

export const SplashScreen = () => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 45,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
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
