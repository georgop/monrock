import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { VideoInfo, pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { v } from '@faker-js/faker/dist/airline-WjISwexU';
import { EmptyCheckbox } from 'assets/svg/EmptyCheckbox';
import { CheckedCheckbox } from 'assets/svg/CheckedCheckbox';
import { calculateAdSpaces, formatDuration } from 'utils/format';
import { PlayIcon } from 'assets/svg/PlayIcon';
import { NotApprovedVideoIcon } from 'assets/svg/NotApprovedVideoIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { useNavigation } from '@react-navigation/native';
import { VideoPlayer } from './VideoPlayer';

type TabsProps = StackNavigationProp<RootStackParamList>;

export type AddMediaProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedVideos: VideoInfo[];
  setSelectedVideos: (value: VideoInfo[]) => void;
};

export const AddMedia: React.FC<AddMediaProps> = ({
  isOpen,
  setIsOpen,
  selectedVideos,
  setSelectedVideos,
}) => {
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

  const handleSelectVideo = (video: VideoInfo) => () => {
    const index = selectedVideos.findIndex((v) => v.id === video.id);
    if (index === -1) {
      setSelectedVideos([...selectedVideos, video]);
    } else {
      setSelectedVideos(selectedVideos.filter((v) => v.id !== video.id));
    }
  };

  const navigation = useNavigation<TabsProps>();
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState<string | null>(null);

  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={() => setIsOpen(false)}>
      <View className="z-[100] flex h-[64px] flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setIsOpen(false)} className="flex w-20 items-center">
          <GoBackIcon />
        </TouchableOpacity>
        <Text className="text-[22px] font-semibold">Select media</Text>
        <View className="w-20" />
      </View>
      {showPlayer && currentVideoUri && (
        <VideoPlayer videoUri={currentVideoUri} isOpen={showPlayer} setIsOpen={setShowPlayer} />
      )}
      <ScrollView className="flex-1 px-6 pb-6">
        {videos.length === 0 && (
          <View className="flex h-[90vh] items-center justify-center">
            <Text className="text-center text-[28px] font-semibold">No videos found.</Text>
            <TouchableOpacity>
              <Text
                className="mt-4 text-center text-[20px] font-semibold text-[#005AD0]"
                onPress={() => {
                  setIsOpen(false);
                  navigation.navigate('MediaLibrary');
                }}>
                Go to media library
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            className="mt-6 flex flex-row items-center justify-between"
            disabled={!video.isApproved}
            onPress={handleSelectVideo(video)}>
            <TouchableOpacity
              onPress={() => {
                setCurrentVideoUri(video.uri);
                setShowPlayer(true);
              }}>
              <Image
                source={{ uri: video.thumbnailUri }}
                className="h-[88px] w-[88px] rounded-[24px]"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: video.isApproved
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(180,180,180,0.6)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                }}>
                {video.isApproved ? <PlayIcon /> : <NotApprovedVideoIcon />}
              </View>
            </TouchableOpacity>
            <View className="ml-4 flex-1 justify-center">
              <Text
                className="text-lg font-semibold"
                numberOfLines={1}
                style={{ color: video.isApproved ? 'black' : 'rgba(180,180,180,0.6)' }}>
                {video.fileName}
              </Text>
              <Text
                className="text-sm"
                style={{ color: video.isApproved ? 'black' : 'rgba(180,180,180,0.6)' }}>
                {video.resolution.width} x {video.resolution.height}
              </Text>
              <Text
                className="text-sm"
                style={{ color: video.isApproved ? 'black' : 'rgba(180,180,180,0.6)' }}>
                {formatDuration(video.duration)} / {calculateAdSpaces(video.duration)} ad space
                {calculateAdSpaces(video.duration) > 1 ? 's' : ''}
              </Text>
              <Text
                className="text-sm"
                style={{ color: video.isApproved ? 'black' : 'rgba(180,180,180,0.6)' }}>
                {video.size} MB
              </Text>
            </View>
            {video.isApproved && (
              <View className="flex-shrink-0">
                {selectedVideos.find((v) => v.id === video.id) ? (
                  <CheckedCheckbox />
                ) : (
                  <EmptyCheckbox />
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        className="mb-8 mt-9 h-12 w-40 items-center justify-center self-center rounded-full border border-[#005AD0] bg-[#005AD0]"
        onPress={() => {
          setIsOpen(false);
        }}>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-lg font-semibold text-white">Done</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
