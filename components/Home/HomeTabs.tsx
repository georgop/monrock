import { AccountIcon } from 'assets/svg/AccountIcon';
import { HistoryIcon } from 'assets/svg/HistoryIcon';
import { MediaLibraryIcon } from 'assets/svg/MediaLibraryIcon';
import { ScheduledIcon } from 'assets/svg/ScheduledIcon';
import { TouchableOpacity, View } from 'react-native';

export const HomeTabs = () => {
  return (
    <View
      className="h-14 rounded-[28px] bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 4,
      }}>
      <View className="flex h-full flex-row items-center justify-between p-2">
        <TouchableOpacity className="flex-1 items-center justify-center">
          <ScheduledIcon width={24} height={24} />
        </TouchableOpacity>
        <View className="h-full w-[1px] bg-[#ABB8BD]" />
        <TouchableOpacity className="flex-1 items-center justify-center">
          <MediaLibraryIcon width={24} height={24} />
        </TouchableOpacity>
        <View className="h-full w-[1px] bg-[#ABB8BD]" />
        <TouchableOpacity className="flex-1 items-center justify-center">
          <HistoryIcon width={24} height={24} />
        </TouchableOpacity>
        <View className="h-full w-[1px] bg-[#ABB8BD]" />
        <TouchableOpacity className="flex-1 items-center justify-center">
          <AccountIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
