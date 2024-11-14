import { DurationIcon } from 'assets/svg/DurationIcon';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { ScreenHeader } from 'components/ScreenHeader';
import { Playback } from 'mocks/types';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex h-[64px] w-full flex-row items-center">
        <TouchableOpacity onPress={() => onClose()} className="flex w-20 items-center">
          <GoBackIcon />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-semibold">Booking overview</Text>
        <View className="w-20"></View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className=" flex flex-1 items-center p-6">
          <View>
            <Text className="text-center text-[18px] font-semibold text-[#02326F]">
              Monitor selection
            </Text>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
          <View className="mt-4">
            <Text className="text-center text-[18px] font-semibold text-[#02326F]">
              Video playlist
            </Text>
            {playback.selectedVideos.map((video) => (
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
                      {formatDuration(video.duration)} / {calculateAdSpaces(video.duration)} ad
                      space
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
              <Text className="text-[16px] font-semibold text-[#02326F]">
                TOTAL COST OF PLAYBACK
              </Text>
              <Text className="text-[28px] font-semibold text-[#02326F]">€1200,00</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity
            className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#FF0000] bg-[#FF0000]"
            onPress={() => {
              deleteScheduledPlayback(playback.id);
              onClose();
            }}>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-white">Cancel booking</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
