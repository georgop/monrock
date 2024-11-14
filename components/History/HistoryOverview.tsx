import { FontAwesome } from '@expo/vector-icons';
import { GoBackIcon } from 'assets/svg/GoBackIcon';
import { ScrollView, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PercentageCircle } from './PercentageCircle';
import { AvailableMonitorsIcon } from 'assets/svg/AvailableMonitorsIcon';

export type HistoryOverviewProps = {
  onClose: () => void;
};

type HistoryItemProps = {
  date: string;
  location: string;
  playlistCount: number;
  adSpaces: number;
  femaleViews: number;
  maleViews: number;
  cost: number;
};

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  location,
  playlistCount,
  adSpaces,
  femaleViews,
  maleViews,
  cost,
}) => (
  <View className="mb-4 w-full rounded-lg p-4">
    <Text className="text-[18px] font-[600] text-[#02326F]">{date}</Text>
    <View className="mt-4 flex flex-row items-center gap-1">
      <AvailableMonitorsIcon />
      <Text className="text-[14px] font-[600] text-[#293037]">{location}</Text>
    </View>
    <View className="ml-6 gap-y-1">
      <Text className="mt-1 text-[14px] font-[400] text-[#293037]">
        Playlist of: {playlistCount} videos
      </Text>
      <Text className="text-[14px] font-[400] text-[#293037]">Ad spaces: {adSpaces}</Text>
      <Text className="text-[14px] font-[400] text-[#293037]">
        Views: {femaleViews} female / {maleViews} male
      </Text>
      <Text className="text-[14px] font-[500] text-[#293037]">Cost: €{cost.toFixed(2)}</Text>
    </View>
  </View>
);

export const HistoryOverview: React.FC<HistoryOverviewProps> = ({ onClose }) => {
  const randomTotalViews = Math.floor(Math.random() * 5000);
  const randomFemalePercentage = Math.floor(Math.random() * 100);
  const femaleCount = Math.floor((randomTotalViews * randomFemalePercentage) / 100);
  const maleCount = randomTotalViews - femaleCount;

  const historyData = [
    {
      date: '31 Aug 2024',
      location: 'Basement floor / Entrance',
      playlistCount: 2,
      adSpaces: 3,
      femaleViews: 150,
      maleViews: 150,
      cost: 900.0,
    },
    {
      date: '26 Aug 2024',
      location: 'Basement floor / Entrance',
      playlistCount: 2,
      adSpaces: 3,
      femaleViews: 75,
      maleViews: 75,
      cost: 300.0,
    },
    {
      date: '26 Aug 2024',
      location: 'Basement floor / Entrance',
      playlistCount: 2,
      adSpaces: 3,
      femaleViews: 75,
      maleViews: 75,
      cost: 300.0,
    },
    {
      date: '26 Aug 2024',
      location: 'Basement floor / Entrance',
      playlistCount: 2,
      adSpaces: 3,
      femaleViews: 75,
      maleViews: 75,
      cost: 300.0,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex h-[64px] w-full flex-row items-center">
        <TouchableOpacity onPress={() => onClose()} className="flex w-20 items-center">
          <GoBackIcon />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-semibold">History overview</Text>
        <View className="w-20"></View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 items-center p-6">
          <ImageBackground
            style={{ height: 220, width: '100%', borderRadius: 12, overflow: 'hidden' }}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/2316/0b69/8db57580e4d3a53f288df0c9f354ef44?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQQuPyxYgiHoPHomoMPp-JAnV01gl3S6bOIq2Dzw6EOQ-UwibtA6yIzNzDXR8voaf-0ItUq~1rFAOfKPXHRkcuX8fV0RnyHFfd-YzYjFVZCnuvQ56Hla38zCl6M-oE-6RuidfYYTR8V~hxgQdWAR1sCcNjy1NZsZcNACrr-H2SvOOqAJIbhO-ycCs1Yqeq4WLUzmqQwnlgw7UGbeRGJGRvHWr5RAwiSMEejvDaLl9urAYmVM9664K1Jlul3zxxEme4Hrfa1fL0TLDyjX6WYaAtl1Ss9EjgGECdA2hVNP-wP6ZBoQOtluShQ9oT-~MI8TjPI-wBHL~ETlgYN57f5U7Q__',
            }}>
            <View
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: '100%' }}
              className="flex justify-center">
              <PercentageCircle
                totalViews={randomTotalViews}
                femalePercentage={randomFemalePercentage}
              />
              <View className="flex flex-row items-center justify-between px-6">
                <View className="flex flex-row items-center justify-center gap-1">
                  <View className="h-[6px] w-[6px] rounded-full bg-[#E972FB]"></View>
                  <Text className="text-[12px] font-[500]">{femaleCount} female</Text>
                </View>
                <View className="flex flex-row items-center justify-between gap-1">
                  <View className="h-[6px] w-[6px] rounded-full bg-[#00A3FF]"></View>
                  <Text className="text-[12px] font-[500]">{maleCount} male</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View className="mt-6 w-full">
            {historyData.map((item, index) => (
              <HistoryItem
                key={index}
                date={item.date}
                location={item.location}
                playlistCount={item.playlistCount}
                adSpaces={item.adSpaces}
                femaleViews={item.femaleViews}
                maleViews={item.maleViews}
                cost={item.cost}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
