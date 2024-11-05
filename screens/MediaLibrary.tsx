import AsyncStorage from '@react-native-async-storage/async-storage';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import Drawer from 'components/Home/Drawer';
import { VideosCarousel } from 'components/MediaLibrary/VideosCarousel';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoInfo, pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';

export const MediaLibrary = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
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

  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setDrawerOpen(!drawerOpen);
  };

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="z-[100] flex h-[64px] flex-row items-center justify-between">
        <TouchableOpacity onPress={toggleDrawer} className="flex w-20 items-center">
          <HamburgerIcon />
        </TouchableOpacity>
        <Text className="text-[22px] font-semibold">Media library</Text>
        <View className="w-20" />
      </View>
      <View className="flex flex-1 items-center justify-center">
        <VideosCarousel videos={videos} setVideos={setVideos} />
      </View>
      <View className="h-[150px]">
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
      {drawerOpen && (
        <Drawer animation={animation} isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      )}
    </SafeAreaView>
  );
};
