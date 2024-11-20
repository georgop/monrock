import { DurationIcon } from 'assets/svg/DurationIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { PlayIcon } from 'assets/svg/PlayIcon';
import { VideoPlayer } from 'components/VideoPlayer';
import { format } from 'date-fns';
import { Playback } from 'mocks/types';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { calculateAdSpaces, formatDuration } from 'utils/format';

export type ScheduledOverviewProps = {
  playback: Playback;
  onClose: () => void;
  deleteScheduledPlayback: (id: string) => void;
};

export const ScheduledOverview: React.FC<ScheduledOverviewProps> = ({
  playback,
  onClose,
  deleteScheduledPlayback,
}) => {
  const totalAdSpace = playback.selectedVideos.reduce(
    (total, video) => total + calculateAdSpaces(video.duration),
    0
  );

  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState<string | null>(null);

  const confirmDeleteScheduledPlayback = (id: string) => {
    Alert.alert('Delete booking', 'Are you sure you want to delete this booking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          deleteScheduledPlayback(id);
          onClose();
        },
        style: 'destructive',
      },
    ]);
  };

  if (!playback.selectedMonitor) return null;
  return (
    <View className="flex-1 bg-white">
      <View className="mt-8 flex h-[64px] w-full flex-row items-center">
        <TouchableOpacity onPress={() => onClose()} className="flex w-20 items-center">
          <GoBackIcon />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-semibold">Booking overview</Text>
        <View className="w-20"></View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className=" flex flex-1 items-center py-6">
          <View>
            <Text className="text-center text-[18px] font-semibold text-[#02326F]">
              Monitor selection
            </Text>
            <View
              key={playback.selectedMonitor.monitor.id}
              className="mt-6 flex w-full flex-row items-center justify-between px-6">
              <View>
                <Image
                  source={{ uri: playback.selectedMonitor.monitor.image }}
                  className="h-[88px] w-[88px] rounded-[24px]"
                />
              </View>
              <View className="ml-4 flex-1 justify-center">
                <Text className="text-lg font-semibold" numberOfLines={1}>
                  {playback.selectedMonitor.monitor.name}
                </Text>
                <Text className="text-sm font-semibold">
                  {playback.selectedMonitor.advertisingSpotName}
                </Text>
                <Text className="text-sm font-semibold">{playback.selectedMonitor.address}</Text>
              </View>
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-center text-[18px] font-semibold text-[#02326F]">
              Video playlist
            </Text>
            {showPlayer && currentVideoUri && (
              <VideoPlayer
                videoUri={currentVideoUri}
                isOpen={showPlayer}
                setIsOpen={setShowPlayer}
              />
            )}
            {playback.selectedVideos.map((video) => (
              <View
                key={video.id}
                className="mt-6 flex w-full flex-row items-center justify-between px-6">
                <TouchableOpacity
                  onPress={() => {
                    {
                      setShowPlayer(true);
                      setCurrentVideoUri(video.uri);
                    }
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
                    <Text className="flex-1 text-sm">
                      {formatDuration(video.duration)} / {calculateAdSpaces(video.duration)} ad
                      space
                      {calculateAdSpaces(video.duration) > 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            <Text className="mt-2 text-center text-[14px]">Total ad spaces</Text>
            <Text className="text-center text-[16px] font-semibold">{totalAdSpace}</Text>
          </View>
          <View className="mt-12">
            <Text className="mt-2 text-center text-[18px] font-semibold text-[#02326F]">
              Playback schedule
            </Text>
            {Object.keys(playback.dates).length > 0 && (
              <View className="mt-4 w-full px-6">
                <Text className="pb-2 text-center text-[14px] font-[400]">Dates</Text>
                {Object.entries(playback.dates).map(([date, { price }]) => (
                  <View key={date} className="mb-2">
                    <Text className="text-center text-[14px] font-bold text-black">
                      {format(new Date(date), 'EEEE, dd MMM yyyy')}
                    </Text>
                  </View>
                ))}
                <Text className="mt-2 text-center text-[12px] font-[500] text-[#5B6876]">
                  Your playlist will start playing at the opening of the store and ends at its
                  closing.
                </Text>
              </View>
            )}
          </View>
          <View className="mt-12">
            <Text className="mb-2 mt-2 text-center text-[18px] font-semibold text-[#02326F]">
              Cost per date
            </Text>
            {Object.entries(playback.dates).map(([date, { price }]) => (
              <View key={date} className="mb-2">
                <Text className="text-center text-[14px] font-bold text-black">
                  {format(new Date(date), 'dd MMM yyyy')}
                </Text>
                <Text className="mt-2 text-center text-[14px] font-[600]">
                  {price * totalAdSpace * 20}€
                </Text>
                <Text className="mt-1 text-center text-[12px] font-[400]">
                  ({totalAdSpace} ad spaces of 20" * {price.toFixed(2)} € / sec )
                </Text>
              </View>
            ))}
          </View>
          <View className="mt-4 h-[105px] w-full items-center justify-center px-6">
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
              <Text className="text-[16px] font-semibold text-[#02326F]">
                TOTAL COST OF PLAYBACK
              </Text>
              <Text className="text-[28px] font-semibold text-[#02326F]">
                {playback.totalCost.toFixed(2)}€
              </Text>
            </ImageBackground>
          </View>
          <TouchableOpacity
            className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#FF0000] bg-[#FF0000]"
            onPress={() => {
              confirmDeleteScheduledPlayback(playback.id);
            }}>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-white">Cancel booking</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
