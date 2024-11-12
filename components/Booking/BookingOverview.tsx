import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DurationIcon } from 'assets/svg/DurationIcon';
import { PlayIcon } from 'assets/svg/PlayIcon';
import { Monitor } from 'mocks/types';
import { RootStackParamList } from 'navigation';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calculateAdSpaces, formatDuration } from 'utils/format';
import { VideoInfo } from 'utils/pickVideoAndExtractInfo';

export type BookingOverviewProps = {
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

const VIDEO_STORAGE_KEY = 'selectedVideos';
const MONITOR_STORAGE_KEY = 'selectedMonitor';
type TabsProps = StackNavigationProp<RootStackParamList>;

export const BookingOverview: React.FC<BookingOverviewProps> = ({ setCurrentState }) => {
  const [selectedVideos, setSelectedVideos] = useState<VideoInfo[]>([]);
  const [selectedMonitor, setSelectedMonitor] = useState<{
    monitor: Monitor;
    advertisingSpotName: string;
    address: string;
  }>();
  const navigation = useNavigation<TabsProps>();

  useEffect(() => {
    const loadSelectedVideos = async () => {
      try {
        const storedVideos = await AsyncStorage.getItem(VIDEO_STORAGE_KEY);
        if (storedVideos) {
          setSelectedVideos(JSON.parse(storedVideos));
        }
      } catch (error) {
        console.error('Failed to load videos from AsyncStorage', error);
      }
    };

    loadSelectedVideos();
  }, []);

  useEffect(() => {
    const loadSelectedMonitor = async () => {
      try {
        const storedMonitor = await AsyncStorage.getItem(MONITOR_STORAGE_KEY);
        if (storedMonitor) {
          setSelectedMonitor(JSON.parse(storedMonitor));
        }
      } catch (error) {
        console.error('Failed to load monitor from AsyncStorage', error);
      }
    };

    loadSelectedMonitor();
  }, []);

  const totalAdSpace = selectedVideos.reduce(
    (total, video) => total + calculateAdSpaces(video.duration),
    0
  );

  const handleCompleteBooking = async () => {
    navigation.navigate('Scheduled');
  };

  if (!selectedMonitor || selectedVideos.length === 0) return null;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View className=" flex flex-1 items-center p-6">
        <View>
          <Text className="text-center text-[18px] font-semibold text-[#02326F]">
            Monitor selection
          </Text>
          <TouchableOpacity
            key={selectedMonitor.monitor.id}
            className="mt-6 flex w-full flex-row items-center justify-between px-6">
            <View>
              <Image
                source={{ uri: selectedMonitor.monitor.image }}
                className="h-[88px] w-[88px] rounded-[24px]"
              />
            </View>
            <View className="ml-4 flex-1 justify-center">
              <Text className="text-lg font-semibold" numberOfLines={1}>
                {selectedMonitor.monitor.name}
              </Text>
              <Text className="text-sm font-semibold">{selectedMonitor.advertisingSpotName}</Text>
              <Text className="text-sm font-semibold">{selectedMonitor.address}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <Text className="text-center text-[18px] font-semibold text-[#02326F]">
            Video playlist
          </Text>
          {selectedVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              className="mt-6 flex w-full flex-row items-center justify-between px-6">
              <View>
                <Image
                  source={{ uri: video.thumbnailUri }}
                  className="h-[88px] w-[88px] rounded-[24px]"
                />
              </View>
              <View className="ml-4 flex-1 justify-center">
                <Text className="text-lg font-semibold" numberOfLines={1}>
                  {video.fileName}
                </Text>
                <Text className="text-sm">
                  {video.resolution.width} x {video.resolution.height}
                </Text>
                <View className="flex flex-row items-center gap-1">
                  <DurationIcon />
                  <Text className="flex-1 text-sm">
                    {formatDuration(video.duration)} / {calculateAdSpaces(video.duration)} ad space
                    {calculateAdSpaces(video.duration) > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text className="mt-2 text-center text-[14px]">Total ad spaces</Text>
          <Text className="text-center text-[16px] font-semibold">{totalAdSpace}</Text>
        </View>
        <View className="mt-4">
          <Text className="mt-2 text-[18px] font-semibold text-[#02326F]">Playback schedule</Text>
          <Text className="text-center">Unavailable</Text>
        </View>
        <View className="mt-4">
          <Text className="mt-2 text-[18px] font-semibold text-[#02326F]">Cost per day</Text>
          <Text className="text-center">Unavailable</Text>
        </View>
        <View className="mt-4 h-[105px] w-full items-center justify-center">
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              overflow: 'hidden',
            }}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/2316/0b69/8db57580e4d3a53f288df0c9f354ef44?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQQuPyxYgiHoPHomoMPp-JAnV01gl3S6bOIq2Dzw6EOQ-UwibtA6yIzNzDXR8voaf-0ItUq~1rFAOfKPXHRkcuX8fV0RnyHFfd-YzYjFVZCnuvQ56Hla38zCl6M-oE-6RuidfYYTR8V~hxgQdWAR1sCcNjy1NZsZcNACrr-H2SvOOqAJIbhO-ycCs1Yqeq4WLUzmqQwnlgw7UGbeRGJGRvHWr5RAwiSMEejvDaLl9urAYmVM9664K1Jlul3zxxEme4Hrfa1fL0TLDyjX6WYaAtl1Ss9EjgGECdA2hVNP-wP6ZBoQOtluShQ9oT-~MI8TjPI-wBHL~ETlgYN57f5U7Q__',
            }}>
            <Text className="text-[16px] font-semibold text-[#02326F]">TOTAL COST OF PLAYBACK</Text>
            <Text className="text-[28px] font-semibold text-[#02326F]">€1200,00</Text>
          </ImageBackground>
        </View>
        <TouchableOpacity
          className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]"
          onPress={() => {
            handleCompleteBooking();
          }}>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-white">Complete booking</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
