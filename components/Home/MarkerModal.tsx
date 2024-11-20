import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { AdvertisingSpot } from 'mocks/types';
import { FavoriteIcon } from 'assets/svg/FavoriteIcon';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryIcon } from 'assets/svg/CategoryIcon';
import { WorkingHoursIcon } from 'assets/svg/WorkingHoursIcon';
import { AvailableMonitorsIcon } from 'assets/svg/AvailableMonitorsIcon';
import { AdvertisingDaysIcon } from 'assets/svg/AdvertisingDaysIcon';
import { ViewPerDayIcon } from 'assets/svg/ViewPerDayIcon';
import { TargetAudienceIcon } from 'assets/svg/TargetAudienceIcon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { EyeIcon } from 'assets/svg/EyeIcon';

interface MarkerModalProps {
  visible: boolean;
  onClose: () => void;
  marker: AdvertisingSpot | undefined;
}

type MarkerModalNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;

export const MarkerModal: React.FC<MarkerModalProps> = ({ visible, onClose, marker }) => {
  const navigation = useNavigation<MarkerModalNavigationProp>();

  if (!marker) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-gray-200 opacity-60" />
      </TouchableWithoutFeedback>

      <View className="rounded-tl-[36px] rounded-tr-[36px] bg-white px-6 pb-6 pt-[33px]">
        <View className="flex flex-col px-6">
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity>
              <FavoriteIcon />
            </TouchableOpacity>
            <Text className="text-[20px] font-bold">{marker.name}</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
              <ExitIcon />
            </TouchableOpacity>
          </View>
          <Text className="text-center text-[14px] font-normal">{marker.address}</Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 24 }}>
            {marker.images.map((image, index) => (
              <View className="mx-2" key={index}>
                <Image
                  key={index}
                  src={image}
                  style={{ width: 150, height: 120, borderRadius: 12 }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="m-6 flex justify-around gap-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <CategoryIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Category</Text>
            </View>
            <Text className="mr-6 text-[14px] font-semibold text-[#293037]">
              {marker.category.name}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <WorkingHoursIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Working hours</Text>
            </View>
            <TouchableOpacity className="flex flex-row items-center gap-[6px]">
              <Text className="text-[14px] font-semibold text-[#293037]">View schedule</Text>
              <EyeIcon color={'#005AD0'} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <AvailableMonitorsIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Available monitors</Text>
            </View>
            <Text className="mr-6 text-[14px] font-semibold text-[#293037]">
              {marker.availableMonitors} out of {marker.totalMonitors}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <AdvertisingDaysIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Advertisting days</Text>
            </View>
            <Text className="mr-6 text-[14px] font-semibold text-[#293037]">
              {marker.advertistingDays}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <ViewPerDayIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Views per day</Text>
            </View>
            <Text className="mr-6 text-[14px] font-semibold text-[#293037]">
              {marker.viewsPerDay}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <TargetAudienceIcon />
              <Text className="text-[14px] font-normal text-[#293037]">Target audience</Text>
            </View>
            <Text className="mr-6 text-[14px] font-semibold text-[#293037]">
              {marker.targetAudience}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="self-center"
          onPress={() => {
            onClose();
            navigation.navigate('Booking', { advertisingSpotId: marker.id });
          }}>
          <Text className="rounded-[9999px] border-[1px] border-[#005AD0] px-6 py-[13px] text-center text-[16px] font-semibold text-[#005AD0]">
            Available monitors
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
