import { DeleteVideoIcon } from 'assets/svg/DeleteVideoIcon';
import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  LayoutChangeEvent,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResizeMode, Video } from 'expo-av';
import { VideoInfo } from 'utils/pickVideoAndExtractInfo';
import { PlayIcon } from 'assets/svg/PlayIcon';
import { VideoPlayer } from 'components/VideoPlayer';
import { calculateAdSpaces, formatDuration } from 'utils/format';
import { TimesPlayedIcon } from 'assets/svg/TimesPlayedIcon';

export type VideosCarouselProps = {
  videos: VideoInfo[];
  setVideos: (value: VideoInfo[]) => void;
  width: number;
  height: number;
};

export const VideosCarousel: React.FC<VideosCarouselProps> = ({
  videos,
  setVideos,
  width,
  height,
}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState<string | null>(null);

  const handleDeleteVideo = async (index: number) => {
    try {
      const updatedVideos = videos.filter((_, i) => i !== index);
      await AsyncStorage.setItem('videoInfo', JSON.stringify(updatedVideos));
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

  const handleThumbnailPress = (videoUri: string) => {
    setCurrentVideoUri(videoUri);
    setShowPlayer(true);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <View>
      <Carousel
        loop={false}
        width={width}
        height={height + 50}
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
            <TouchableOpacity onPress={() => handleThumbnailPress(videos[index].uri)}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: videos[index].thumbnailUri }}
                  style={{ width: '100%', height: 200, borderRadius: 24 }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                  }}>
                  <PlayIcon />
                </View>
              </View>
            </TouchableOpacity>
            <View className="mt-4 flex-1 items-center gap-4">
              <Text className="text-semibold text-center text-[22px] text-[#02326F]">
                {videos[index].fileName}
              </Text>
              <View className="mt-4 gap-2">
                <Text className="text-center text-[18px]">
                  {videos[index].resolution.width} x {videos[index].resolution.height}
                </Text>
                <Text className="text-center text-[18px]">
                  {formatDuration(videos[index].duration)} /{' '}
                  {calculateAdSpaces(videos[index].duration)} ad space
                  {calculateAdSpaces(videos[index].duration) > 1 ? 's' : ''}
                </Text>
                <Text className="text-center text-[18px]">{videos[index].size.toFixed(2)} MB</Text>
                {/* <View className="ml-4 flex flex-row items-center gap-1">
                  <TimesPlayedIcon />
                  <Text className="flex-1">0 times played</Text>
                </View> */}
                <Text className="text-center">Added at {videos[index].dateAdded}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}
              onPress={() => confirmDeleteVideo(index)}>
              <DeleteVideoIcon />
            </TouchableOpacity>
          </View>
        )}
      />
      {showPlayer && currentVideoUri && <VideoPlayer videoUri={currentVideoUri} />}
    </View>
  );
};
