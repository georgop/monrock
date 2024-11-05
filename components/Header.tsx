import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { RootStackParamList } from 'navigation';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export type HeaderProps = {
  currentState: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order';
  setCurrentState: (
    value: 'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  ) => void;
};

type HeaderRouteProps = StackNavigationProp<RootStackParamList, 'Home'>;

export const Header: React.FC<HeaderProps> = ({ currentState, setCurrentState }) => {
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

  // Define the flow of states
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
    }
  };

  return (
    <View className="flex h-[64px] w-full flex-row items-center justify-between bg-white px-4">
      <TouchableOpacity className="flex w-20 items-start" onPress={handleGoBack}>
        <GoBackIcon />
      </TouchableOpacity>
      <Text className="text-[22px] font-semibold">{headerTitle}</Text>
      <TouchableOpacity className="flex w-20 items-end" onPress={() => navigation.navigate('Home')}>
        <ExitIcon />
      </TouchableOpacity>
    </View>
  );
};
