import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenHeader } from 'components/ScreenHeader';
import { Playback } from 'mocks/types';
import { ScheduledCard } from 'components/Scheduled/ScheduledCard';

export const Scheduled = () => {
  const [scheduledPlaybacks, setScheduledPlaybacks] = useState<Playback[]>([]);

  useEffect(() => {
    const loadScheduledPlaybacks = async () => {
      try {
        const storedPlaybacks = await AsyncStorage.getItem('scheduledPlaybacks');
        if (storedPlaybacks) {
          setScheduledPlaybacks(JSON.parse(storedPlaybacks));
        }
      } catch (error) {
        console.error('Failed to load scheduled playbacks from AsyncStorage', error);
      }
    };

    loadScheduledPlaybacks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/2316/0b69/8db57580e4d3a53f288df0c9f354ef44?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQQuPyxYgiHoPHomoMPp-JAnV01gl3S6bOIq2Dzw6EOQ-UwibtA6yIzNzDXR8voaf-0ItUq~1rFAOfKPXHRkcuX8fV0RnyHFfd-YzYjFVZCnuvQ56Hla38zCl6M-oE-6RuidfYYTR8V~hxgQdWAR1sCcNjy1NZsZcNACrr-H2SvOOqAJIbhO-ycCs1Yqeq4WLUzmqQwnlgw7UGbeRGJGRvHWr5RAwiSMEejvDaLl9urAYmVM9664K1Jlul3zxxEme4Hrfa1fL0TLDyjX6WYaAtl1Ss9EjgGECdA2hVNP-wP6ZBoQOtluShQ9oT-~MI8TjPI-wBHL~ETlgYN57f5U7Q__',
        }}>
        <ScreenHeader label="Scheduled playbacks" />
        <ScrollView className="flex-1 p-6">
          {scheduledPlaybacks.map((playback, index) => (
            <ScheduledCard playBack={playback} key={index} />
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
