import React, { useEffect, useRef } from 'react';
import { Animated, View, Image } from 'react-native';
import { Logo } from 'assets/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreenText } from 'assets/SplashScreenText';
import { SplashScreenPin } from 'assets/SplashScreenPin';

export const SplashScreen = () => {
  const translateY = useRef(new Animated.Value(0)).current; // Start above the screen

  useEffect(() => {
    // Animation to move logo from up to down
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 45, // Move down 40 units
          duration: 1500, // Duration of the animation
          useNativeDriver: true, // Use native driver for performance
        }),
        Animated.timing(translateY, {
          toValue: 0, // Move back up to the starting position
          duration: 1500, // No duration to snap back immediately
          useNativeDriver: true, // Use native driver for performance
        }),
      ])
    ).start(); // Start the looping animation
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
            source={require('../assets/image.png')} // Adjust the path based on your folder structure
            style={{ width: 180, height: 120 }} // Set the width and height of the image
            resizeMode="contain" // Adjust the resizing mode as needed
          />
        </Animated.View>
        <Image
          source={require('../assets/map.png')} // Adjust the path based on your folder structure
          style={{ width: 300, height: 150 }} // Set the width and height of the image
          resizeMode="contain" // Adjust the resizing mode as needed
        />
      </View>
    </LinearGradient>
  );
};
