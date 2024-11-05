import { AddMedia } from 'components/AddMedia';
import { Image, View, Text, TouchableOpacity } from 'react-native';

export const CreateVideoPlaylist = () => {
  return (
    <View className="mt-24">
      <Image source={require('../../assets/images/step1.png')} className="h-28 w-28" />
      <TouchableOpacity className="mt-9 h-12 w-40 items-center justify-center rounded-full border border-[#005AD0] bg-[#005AD0]">
        <Text className="text-lg font-semibold text-white">Add media</Text>
      </TouchableOpacity>
      <AddMedia />
    </View>
  );
};
