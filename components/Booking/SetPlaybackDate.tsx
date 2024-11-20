import { CalendarIcon } from 'assets/svg/CalendarIcon';
import { StepTwoIcon } from 'assets/svg/StepTwoIcon';
import { DateSectionList } from 'components/DateSectionList';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { VideoInfo } from 'utils/pickVideoAndExtractInfo';
import { calculateAdSpaces } from 'utils/format';

export type SetPlaybackDateProps = {
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

type SelectedDate = {
  price: number;
};

export const SetPlaybackDate: React.FC<SetPlaybackDateProps> = ({ setCurrentState }) => {
  const [isCalendarOpen, setIsOpenCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Record<string, SelectedDate>>({});
  const [totalCost, setTotalCost] = useState<number>(0);

  const loadSelectedDates = async () => {
    try {
      const storedDates = await AsyncStorage.getItem('selectedDates');
      if (storedDates) {
        const parsedDates = JSON.parse(storedDates);
        setSelectedDates(parsedDates);

        const total = Object.values(parsedDates).reduce(
          (sum: number, date) => sum + (date as SelectedDate).price * totalAdSpace * 20,
          0
        );
        setTotalCost(total);
      } else {
        setSelectedDates({});
        setTotalCost(0);
      }
    } catch (error) {
      console.error('Failed to fetch selected dates', error);
    }
  };

  const [selectedVideos, setSelectedVideos] = useState<VideoInfo[]>([]);

  const totalAdSpace = selectedVideos.reduce(
    (total, video) => total + calculateAdSpaces(video.duration),
    0
  );

  useEffect(() => {
    loadSelectedDates();
  }, [isCalendarOpen, totalAdSpace]); // Refetch when the calendar is closed

  useEffect(() => {
    const loadSelectedVideos = async () => {
      try {
        const storedVideos = await AsyncStorage.getItem('selectedVideos');
        if (storedVideos) {
          setSelectedVideos(JSON.parse(storedVideos));
        }
      } catch (error) {
        console.error('Failed to load videos from AsyncStorage', error);
      }
    };

    loadSelectedVideos();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View className="mt-8 flex flex-1 items-center px-6">
          <StepTwoIcon />
          <Text className="mt-[40px] w-full text-center text-[18px] font-semibold text-[#02326F]">
            PLAYBACK COST
          </Text>
          <Text className="text-[36px] font-semibold text-[#02326F]">{totalCost.toFixed(2)} €</Text>
          <Text className="mt-8 w-full text-center text-[18px] font-semibold text-[#02326F]">
            Playback dates
          </Text>
          <Text className="mt-2 text-center text-[14px] font-[400] text-[#293037]">
            {Object.keys(selectedDates).length === 0
              ? 'Schedule one or more dates for your video playback and see the applied charges.'
              : 'To successfully complete your booking, please ensure that your account has sufficient funds to cover the total cost of the playback.'}
          </Text>
          <TouchableOpacity
            onPress={() => setIsOpenCalendar(true)}
            className="mt-4 flex flex-row items-center gap-1"
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <CalendarIcon color={'#005AD0'} width={12} height={12} />
            <Text className="text-[14px] font-semibold">Open calendar</Text>
          </TouchableOpacity>

          {Object.keys(selectedDates).length > 0 && (
            <View className="mt-4 w-full px-6">
              {Object.entries(selectedDates).map(([date, { price }]) => (
                <View key={date} className="mb-2 flex flex-row justify-between rounded-lg p-3">
                  <Text className="text-[14px] font-medium text-[#293037]">
                    {format(new Date(date), 'EEEE, dd MMM yyyy')}
                  </Text>
                  <Text className="text-[14px] font-medium text-[#02326F]">
                    {price.toFixed(2)} € / sec
                  </Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]"
            style={{
              backgroundColor: Object.keys(selectedDates).length === 0 ? '#ABB8BD' : '#005AD0',
              borderColor: Object.keys(selectedDates).length === 0 ? '#ABB8BD' : 'none',
            }}
            onPress={() => setCurrentState('complete-order')}
            disabled={Object.keys(selectedDates).length === 0}>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-white">Checkout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        statusBarTranslucent={true}
        visible={isCalendarOpen}
        onRequestClose={() => setIsOpenCalendar(false)}>
        <DateSectionList setIsOpen={setIsOpenCalendar} />
      </Modal>
    </>
  );
};
