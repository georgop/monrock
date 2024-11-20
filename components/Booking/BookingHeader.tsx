import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from 'navigation';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export type BookingHeaderProps = {
  currentState: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order';
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

type HeaderRouteProps = StackNavigationProp<RootStackParamList, 'Home'>;

const VIDEO_STORAGE_KEY = 'selectedVideos';
const MONITOR_STORAGE_KEY = 'selectedMonitor';

export const BookingHeader: React.FC<BookingHeaderProps> = ({ currentState, setCurrentState }) => {
  const [headerTitle, setHeaderTitle] = useState<string>('Available monitors');

  useEffect(() => {
    if (currentState === 'select-monitor') {
      setHeaderTitle('Available monitors');
    } else if (currentState === 'create-video-playlist') {
      setHeaderTitle('Create video playlist');
    } else if (currentState === 'set-playback-date') {
      setHeaderTitle('Set playback date');
    } else if (currentState === 'complete-order') {
      setHeaderTitle('Booking overview');
    }
  }, [currentState]);

  const navigation = useNavigation<HeaderRouteProps>();

  const stateOrder = [
    'select-monitor',
    'create-video-playlist',
    'set-playback-date',
    'complete-order',
  ] as const;
  const currentIndex = stateOrder.indexOf(currentState);

  const handleGoBack = () => {
    if (currentIndex > 0) {
      setCurrentState(stateOrder[currentIndex - 1]);
    } else {
      navigation.goBack();
      handleExit();
    }
  };

  const handleExit = async () => {
    await AsyncStorage.multiRemove([VIDEO_STORAGE_KEY, MONITOR_STORAGE_KEY, 'selectedDates']);
    navigation.navigate('Home');
  };

  return (
    <View className="flex h-[64px] w-full flex-row items-center justify-between bg-white px-4">
      <TouchableOpacity
        className="flex w-20 items-start"
        onPress={handleGoBack}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
        <GoBackIcon />
      </TouchableOpacity>
      <Text className="text-[22px] font-semibold">{headerTitle}</Text>
      <TouchableOpacity
        className="flex w-20 items-end"
        onPress={handleExit}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
        <ExitIcon />
      </TouchableOpacity>
    </View>
  );
};
