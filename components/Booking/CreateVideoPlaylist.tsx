import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from 'assets/svg/AddIcon';
import { ArrowRightIcon } from 'assets/svg/ArrowRightIcon';
import { DeleteVideoIcon } from 'assets/svg/DeleteVideoIcon';
import { DurationIcon } from 'assets/svg/DurationIcon';
import { NotApprovedVideoIcon } from 'assets/svg/NotApprovedVideoIcon';
import { PlayIcon } from 'assets/svg/PlayIcon';
import { StepOneIcon } from 'assets/svg/StepOneIcon';
import { AddMedia } from 'components/AddMedia';
import { VideoPlayer } from 'components/VideoPlayer';
import { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { calculateAdSpaces, formatDuration } from 'utils/format';
import { VideoInfo, pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';

const VIDEO_STORAGE_KEY = 'selectedVideos';

export type CreateVideoPlaylistProps = {
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

export const CreateVideoPlaylist: React.FC<CreateVideoPlaylistProps> = ({ setCurrentState }) => {
  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<VideoInfo[]>([]);

  const totalAdSpace = selectedVideos.reduce(
    (total, video) => total + calculateAdSpaces(video.duration),
    0
  );

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
    const saveSelectedVideos = async () => {
      try {
        await AsyncStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(selectedVideos));
      } catch (error) {
        console.error('Failed to save videos to AsyncStorage', error);
      }
    };

    saveSelectedVideos();
  }, [selectedVideos]);

  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View className="mt-8 flex flex-1 items-center">
        <StepOneIcon />
        {selectedVideos.length > 0 && (
          <View className="mb-8 mt-8 flex flex-col items-center justify-center">
            <Text className="text-[18px] font-semibold text-[#02326F]">AD SPACES</Text>
            <Text className="text-[36px] font-semibold text-[#02326F]">{totalAdSpace}</Text>
            <Text className="text-center text-[12px] text-[#5B6876]">
              Each ad space is equal to 20” of video playback.
            </Text>
          </View>
        )}
        {selectedVideos.map((video) => (
          <View key={video.id} className="mt-6 flex flex-row items-center justify-between px-6">
            {showPlayer && currentVideoUri && (
              <VideoPlayer
                videoUri={currentVideoUri}
                isOpen={showPlayer}
                setIsOpen={setShowPlayer}
              />
            )}
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
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                }}>
                <PlayIcon />
              </View>
            </TouchableOpacity>
            <View className="ml-4 flex-1 justify-center">
              <Text className="text-lg font-semibold" numberOfLines={1}>
                {video.fileName}
              </Text>
              <Text className="text-sm">
                {video.resolution.width} x {video.resolution.height}
              </Text>
              <View className="flex flex-row items-center gap-1">
                <DurationIcon />
                <Text className="text-sm">
                  {formatDuration(video.duration)} / {calculateAdSpaces(video.duration)} ad space
                  {calculateAdSpaces(video.duration) > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
            {video.isApproved && (
              <TouchableOpacity
                className="flex-shrink-0"
                onPress={() => {
                  const updatedVideos = selectedVideos.filter((v) => v.id !== video.id);
                  setSelectedVideos(updatedVideos);
                }}>
                <DeleteVideoIcon />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]"
          onPress={() => setAddMediaModalOpen(true)}>
          <View className="flex flex-row items-center gap-2">
            <AddIcon />
            <Text className="text-lg font-semibold text-white">Add media</Text>
          </View>
        </TouchableOpacity>
        {addMediaModalOpen && (
          <AddMedia
            isOpen={addMediaModalOpen}
            setIsOpen={setAddMediaModalOpen}
            selectedVideos={selectedVideos}
            setSelectedVideos={setSelectedVideos}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setCurrentState('set-playback-date');
          }}
          className="mt-[54px] flex flex-row items-center justify-center gap-2"
          disabled={selectedVideos.length === 0}>
          <Text
            className="font-semibold"
            style={{ color: selectedVideos.length > 0 ? '#005AD0' : '#CBD4D9' }}>
            Next step
          </Text>
          <ArrowRightIcon color={selectedVideos.length > 0 ? '#005AD0' : '#CBD4D9'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
