import AsyncStorage from '@react-native-async-storage/async-storage';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import Drawer from 'components/Home/Drawer';
import { VideosCarousel } from 'components/MediaLibrary/VideosCarousel';
import { ScreenHeader } from 'components/ScreenHeader';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, Alert, LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoInfo, pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';

export const MediaLibrary = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const fetchVideos = async () => {
    try {
      const videoInfo = await AsyncStorage.getItem('videoInfo');
      if (videoInfo !== null) {
        const parsedVideos = JSON.parse(videoInfo);
        setVideos(parsedVideos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePickVideo = async () => {
    const info = await pickVideoAndExtractInfo();
    if (info) {
      try {
        const existingVideos = await AsyncStorage.getItem('videoInfo');
        const videoList = existingVideos ? JSON.parse(existingVideos) : [];
        videoList.push(info);
        await AsyncStorage.setItem('videoInfo', JSON.stringify(videoList));

        fetchVideos();
      } catch (error) {
        console.error('Error adding video:', error);
      }
    } else {
      Alert.alert('No video selected or an error occurred.');
    }
  };

  type Dimensions = {
    width: number;
    height: number;
  };
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 100, height: 100 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader label="Media library" />
      <View className="flex flex-1 items-center justify-center" onLayout={onLayout}>
        <VideosCarousel
          videos={videos}
          setVideos={setVideos}
          width={dimensions.width}
          height={dimensions.height}
        />
      </View>
      <View className="flex h-[150px] items-center justify-center">
        <TouchableOpacity
          className="self-center"
          onPress={() => {
            handlePickVideo();
          }}>
          <Text className="rounded-[9999px] border-[1px] border-[#005AD0] bg-[#005AD0] px-6 py-[14px] text-center text-[20px] font-semibold text-[#FFFFFF]">
            Add media
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
