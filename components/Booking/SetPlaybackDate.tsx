import { CalendarIcon } from 'assets/svg/CalendarIcon';
import { StepTwoIcon } from 'assets/svg/StepTwoIcon';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export type SetPlaybackDateProps = {
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

export const SetPlaybackDate: React.FC<SetPlaybackDateProps> = ({ setCurrentState }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View className="mt-8 flex flex-1 items-center p-6">
        <StepTwoIcon />
        <Text className="mt-[40px] w-full text-center text-[18px] font-semibold text-[#02326F]">
          PLAYBACK COST
        </Text>
        <Text className="text-[36px] font-semibold text-[#02326F]">0,00</Text>
        <Text className="mt-8 w-full text-center text-[18px] font-semibold text-[#02326F]">
          Playback dates
        </Text>
        <Text className="mt-2 text-center text-[14px] text-[#293037]">
          Schedule one or more dates for your video playback and see the applied charges.
        </Text>
        <TouchableOpacity className="mt-4 flex flex-row items-center gap-1">
          <CalendarIcon color={'#005AD0'} width={12} height={12} />
          <Text className="text-[14px] font-bold">Open calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]"
          onPress={() => setCurrentState('complete-order')}>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-white">Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
