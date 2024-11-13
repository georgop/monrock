import { ChevronRightIcon } from 'assets/svg/ChevronRightIcon';
import { DurationIcon } from 'assets/svg/DurationIcon';
import { Playback } from 'mocks/types';
import { Text, TouchableOpacity, View } from 'react-native';
import { calculateAdSpaces } from 'utils/format';

export type ScheduledCardProps = {
  playBack: Playback;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.toLocaleString('en-GB', { day: '2-digit' }),
    month: date.toLocaleString('en-GB', { month: 'short' }).toUpperCase(),
    year: date.getFullYear(),
  };
};

export const ScheduledCard: React.FC<ScheduledCardProps> = ({ playBack }) => {
  const { day, month, year } = formatDate(playBack.date);

  return (
    <TouchableOpacity className="mb-6 flex-1 rounded-[24px] bg-white p-6">
      <View className="mb-4 flex flex-row items-start justify-between">
        <View className="flex flex-col">
          <Text className="text-[18px] font-semibold text-[#02326F]">Advertising spot</Text>
          <Text className="text-[12px] font-medium text-[#5B6876]">
            {playBack.selectedMonitor.address}, {playBack.selectedMonitor.advertisingSpotName}
          </Text>
        </View>
        <ChevronRightIcon />
      </View>

      <View className="mb-4 flex flex-row items-center justify-between">
        <View>
          <Text className="text-[12px] font-medium text-[#ABB8BD]">PLAYBACK DATE</Text>
          <View className="mt-2 flex flex-row items-center">
            <View>
              <Text className="text-[48px] font-semibold leading-[48px] text-[#02326F]">{day}</Text>
            </View>
            <View className="ml-1 flex flex-col justify-center">
              <Text className="text-[18px] font-semibold leading-[18px] text-[#02326F]">
                {month}
              </Text>
              <Text className="text-[18px] font-semibold leading-[18px] text-[#02326F]">
                {year}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col items-end">
          <Text className="text-[14px] font-medium text-[#1A1A1A]">
            {playBack.selectedVideos.length} videos
          </Text>
          <Text className="text-[14px] font-medium text-[#1A1A1A]">
            {playBack.selectedMonitor.monitor.name}
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between border-t border-gray-200 pt-4">
        <View className="flex flex-row items-center gap-1">
          <DurationIcon />
          <Text className="text-[14px] font-medium text-[#5B6876]">
            {playBack.selectedVideos.reduce(
              (total, video) => total + calculateAdSpaces(video.duration),
              0
            )}{' '}
            Ad spaces
          </Text>
        </View>
        <Text className="text-[18px] font-semibold text-[#02326F]">
          € {playBack.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
