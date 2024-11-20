import { HistoryCard } from 'components/History/HistoryCard';
import { ScreenHeader } from 'components/ScreenHeader';
import { Playback } from 'mocks/types';
import { View, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const History = () => {
  const historyPlaybacks: Playback[] = [
    {
      id: '1',
      selectedMonitor: {
        monitor: {
          id: 1,
          name: 'Monitor 1',
          image: 'https://via.placeholder.com/150',
          specs: [],
          maxVideoAdSpacePerDay: '',
          totalAdSpaces: 0,
        },
        advertisingSpotName: 'Diofantos HQ',
        address: 'Mitropoleos 55-57',
      },
      selectedVideos: [],
      totalAdSpace: 0,
      totalCost: 350,
      dates: { '2024-09-15': { price: 500 } },
    },
    {
      id: '2',
      selectedMonitor: {
        monitor: {
          id: 1,
          name: 'Monitor 2',
          image: 'https://via.placeholder.com/150',
          specs: [],
          maxVideoAdSpacePerDay: '',
          totalAdSpaces: 0,
        },
        advertisingSpotName: 'Diofantos HQ',
        address: 'Mitropoleos 55-57',
      },
      selectedVideos: [],
      totalAdSpace: 0,
      totalCost: 140,
      dates: { '2024-08-31': { price: 100 } },
    },
  ];
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      source={{
        uri: 'https://s3-alpha-sig.figma.com/img/2316/0b69/8db57580e4d3a53f288df0c9f354ef44?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQQuPyxYgiHoPHomoMPp-JAnV01gl3S6bOIq2Dzw6EOQ-UwibtA6yIzNzDXR8voaf-0ItUq~1rFAOfKPXHRkcuX8fV0RnyHFfd-YzYjFVZCnuvQ56Hla38zCl6M-oE-6RuidfYYTR8V~hxgQdWAR1sCcNjy1NZsZcNACrr-H2SvOOqAJIbhO-ycCs1Yqeq4WLUzmqQwnlgw7UGbeRGJGRvHWr5RAwiSMEejvDaLl9urAYmVM9664K1Jlul3zxxEme4Hrfa1fL0TLDyjX6WYaAtl1Ss9EjgGECdA2hVNP-wP6ZBoQOtluShQ9oT-~MI8TjPI-wBHL~ETlgYN57f5U7Q__',
      }}>
      <ScreenHeader label="History" />
      <ScrollView className="flex-1 p-6">
        {historyPlaybacks.map((playback, index) => (
          <HistoryCard playback={playback} key={index} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};
