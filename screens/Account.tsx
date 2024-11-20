import { ChevronRightIcon } from 'assets/svg/ChevronRightIcon';
import { UserIcon } from 'assets/svg/UserIcon';
import { ScreenHeader } from 'components/ScreenHeader';
import { View, Text, TouchableOpacity } from 'react-native';

export const Account = () => {
  return (
    <View className="flex-1">
      <ScreenHeader label={'Account'} />
      <View className="mt-8 flex w-full items-center justify-center">
        <UserIcon />
      </View>
      <TouchableOpacity className="mt-4 flex flex-row items-center justify-between px-6">
        <Text className="text-[16px] font-[500]">Account settings</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      <TouchableOpacity className="mt-6 flex flex-row items-center justify-between px-6">
        <Text className="text-[16px] font-[500]">Personal info</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      <TouchableOpacity className="mt-6 flex flex-row items-center justify-between px-6">
        <Text className="text-[16px] font-[500]">Billing</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
    </View>
  );
};
