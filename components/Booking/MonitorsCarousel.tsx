import { he } from '@faker-js/faker/.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { advertisingSpots } from 'mocks/data';
import { Monitor } from 'mocks/types';
import * as React from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export type MonitorsCarouselProps = {
  advertisingSpotId: number;
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

export const MonitorsCarousel: React.FC<MonitorsCarouselProps> = ({
  advertisingSpotId,
  setCurrentState,
}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const items = advertisingSpots.find((spot) => spot.id === advertisingSpotId)?.monitors;
  const advertisingSpotName = advertisingSpots.find((spot) => spot.id === advertisingSpotId)?.name;
  const address = advertisingSpots.find((spot) => spot.id === advertisingSpotId)?.address;

  const handleBookMonitor = async (monitor: Monitor) => {
    try {
      await AsyncStorage.setItem(
        'selectedMonitor',
        JSON.stringify({ advertisingSpotName, address, monitor })
      );
      setCurrentState('create-video-playlist');
    } catch (error) {
      console.error('Failed to save monitor to AsyncStorage:', error);
    }
  };

  if (!items) return null;

  return (
    <View style={{ height: height }}>
      <Carousel
        style={{ marginTop: 0 }}
        loop={false}
        width={width}
        height={height}
        data={items || []}
        scrollAnimationDuration={1000}
        mode="parallax"
        renderItem={({ index }) => (
          <View
            className="m-4 mb-4 flex flex-1 rounded-[24px] bg-white p-4"
            style={{
              shadowColor: '#000000d1',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,
              elevation: 20,
            }}>
            <Image
              src={items[index].image}
              style={{ width: '100%', height: 200, borderRadius: 24 }}
            />
            <View className="flex-1">
              <Text className="mt-8 text-center text-[22px] font-semibold text-[#02326F]">
                {items[index].name}
              </Text>
              <View className="mt-4 flex flex-col items-center justify-center gap-2">
                {items[index].specs.map((spec, index) => (
                  <Text key={index} className="w-full text-center text-[18px]">
                    {spec}
                  </Text>
                ))}
              </View>
              <View className="mt-4 flex flex-col items-center justify-center">
                <Text className="text-[18px] font-normal text-[#293037]">
                  Max video ad space per day
                </Text>
                <Text className="text-[18px] font-semibold text-[#293037]">
                  {items[index].maxVideoAdSpacePerDay}
                </Text>
              </View>
              <View className="mt-4 flex flex-col items-center justify-center">
                <Text className="text-[18px] font-normal text-[#293037]">Available days</Text>
                <Text className="text-[18px] font-semibold text-[#293037]">Open calendar</Text>
              </View>
            </View>
            <TouchableOpacity
              className="mb-4 w-[191px] self-center"
              onPress={() => handleBookMonitor(items[index])}>
              <Text className="rounded-[9999px] border-[1px] border-[#005AD0] bg-[#005AD0] px-8 py-[16px] text-center text-[20px] font-semibold text-[#FFFFFF]">
                Book monitor
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
