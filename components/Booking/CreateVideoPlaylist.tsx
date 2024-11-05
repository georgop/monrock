import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from 'assets/svg/AddIcon';
import { AddMedia } from 'components/AddMedia';
import { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { pickVideoAndExtractInfo } from 'utils/pickVideoAndExtractInfo';

export const CreateVideoPlaylist = () => {
  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false);

  return (
    <View className="mt-16 flex items-center">
      <Image source={require('../../assets/images/step1.png')} className="h-28 w-28" />
      <TouchableOpacity
        className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]"
        onPress={() => setAddMediaModalOpen(true)}>
        <View className="flex flex-row items-center gap-2">
          <AddIcon />
          <Text className="text-lg font-semibold text-white">Add media</Text>
        </View>
      </TouchableOpacity>
      {addMediaModalOpen && (
        <AddMedia isOpen={addMediaModalOpen} setIsOpen={setAddMediaModalOpen} />
      )}
    </View>
  );
};
