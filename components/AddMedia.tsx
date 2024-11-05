import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit, FFprobeKit } from 'ffmpeg-kit-react-native';
import { VideoInfo, pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { v } from '@faker-js/faker/dist/airline-WjISwexU';

export type AddMediaProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const AddMedia: React.FC<AddMediaProps> = ({ isOpen, setIsOpen }) => {
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

  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={() => setIsOpen(false)}>
      <View className="z-[100] flex h-[64px] flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setIsOpen(false)} className="flex w-20 items-center">
          <GoBackIcon />
        </TouchableOpacity>
        <Text className="text-[22px] font-semibold">Select media</Text>
        <View className="w-20" />
      </View>
      <View>
        <View className="p-6">
          {videos.map((video, index) => (
            <View key={index} className="mt-6 flex flex-row gap-6">
              <Image
                source={{ uri: video.thumbnailUri }}
                className="h-[88px] w-[88px] rounded-[24px]"
              />
              <View>
                <Text className="text-lg font-semibold">Video {index + 1}</Text>
                <Text className="text-sm">{video.duration}</Text>
                <Text className="text-sm">{video.size} MB</Text>
                <Text className="text-sm">{video.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};
