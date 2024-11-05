import { DeleteVideoIcon } from 'assets/svg/DeleteVideoIcon';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VideoInfo } from 'utils/pickVideoAndExtractInfo';

export type VideosCarouselProps = {
  videos: VideoInfo[];
  setVideos: (value: VideoInfo[]) => void;
};

export const VideosCarousel: React.FC<VideosCarouselProps> = ({ videos, setVideos }) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const handleDeleteVideo = async (index: number) => {
    try {
      // Update videos list in AsyncStorage
      const updatedVideos = videos.filter((_, i) => i !== index);
      await AsyncStorage.setItem('videoInfo', JSON.stringify(updatedVideos));

      // Update videos state in parent component
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const confirmDeleteVideo = (index: number) => {
    Alert.alert('Delete Video', 'Are you sure you want to delete this video?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => handleDeleteVideo(index), style: 'destructive' },
    ]);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <View style={{ height: height, marginTop: 200 }}>
      <Carousel
        style={{ marginTop: 0 }}
        loop={false}
        width={width}
        height={height - 200}
        data={videos}
        scrollAnimationDuration={1000}
        mode="parallax"
        renderItem={({ index }) => (
          <View
            style={{
              margin: 16,
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 16,
              shadowColor: '#000000d1',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,
              elevation: 20,
            }}>
            <Image
              source={{ uri: videos[index].thumbnailUri }}
              style={{ width: '100%', height: 200, borderRadius: 24 }}
              resizeMode="cover"
            />
            <View className="mt-4 flex-1 gap-4">
              <Text className="text-semibold text-center text-[22px] text-[#02326F]">
                Video {index + 1}
              </Text>
              <View className="mt-4 gap-2">
                <Text className="text-center text-[18px]">
                  {videos[index].resolution.width} x {videos[index].resolution.height}
                </Text>
                <Text className="text-center text-[18px]">{videos[index].duration}s</Text>
                <Text className="text-center text-[18px]">{videos[index].size.toFixed(2)} MB</Text>
                <Text className="text-center">Added at {videos[index].dateAdded}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}
              onPress={() => confirmDeleteVideo(index)}>
              <DeleteVideoIcon />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
