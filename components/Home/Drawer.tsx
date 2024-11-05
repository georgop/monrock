// Drawer.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AboutIcon } from 'assets/svg/AboutIcon';
import { AccountIcon } from 'assets/svg/AccountIcon';
import { ExitIcon } from 'assets/svg/ExitIcon';
import { FavouritesIcon } from 'assets/svg/FavouritesIcon';
import { FindProIcon } from 'assets/svg/FindProIcon';
import { HelpIcon } from 'assets/svg/HelpIcon';
import { HistoryIcon } from 'assets/svg/HistoryIcon';
import { LogoutIcon } from 'assets/svg/LogoutIcon';
import { MapIcon } from 'assets/svg/MapIcon';
import { MediaLibraryIcon } from 'assets/svg/MediaLibraryIcon';
import { NavigationLogo } from 'assets/svg/NavigationLogo';
import { ScheduledIcon } from 'assets/svg/ScheduledIcon';
import { useAuth } from 'context/AuthContext';
import { RootStackParamList } from 'navigation';
import React from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';

type DrawerProps = {
  animation: Animated.Value;
  isOpen: boolean;
  toggleDrawer: () => void;
};

type TabsProps = StackNavigationProp<RootStackParamList>;

export const Drawer: React.FC<DrawerProps> = ({ animation, isOpen, toggleDrawer }) => {
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  const navigation = useNavigation<TabsProps>();

  const { logout } = useAuth();

  return (
    <>
      {isOpen && (
        <View
          className="absolute inset-0 z-20 h-full w-full bg-[#263e59] opacity-90"
          onTouchEnd={toggleDrawer}
        />
      )}
      <Animated.View
        className="absolute bottom-14 left-0 top-14 z-20 z-[200] w-[80%] rounded-br-[24px] rounded-tr-[24px] bg-white"
        style={{ transform: [{ translateX }] }}>
        <View className="flex flex-1 items-start">
          <TouchableOpacity
            className="flex h-[10%] w-full items-end justify-center px-6"
            onPress={() => toggleDrawer()}>
            <ExitIcon />
          </TouchableOpacity>
          <View className="flex h-[20%] w-full items-center justify-center">
            <NavigationLogo />
          </View>
          <View className="flex h-[70%] w-full justify-around px-[50px] py-8">
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              onPress={() => navigation.navigate('Home')}>
              <MapIcon />
              <Text className="text-[20px] font-semibold text-[#005AD0]">Map</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <ScheduledIcon width={16} height={16} />
              <Text className="text-[20px] font-semibold text-[#005AD0]">Scheduled playbacks</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <FavouritesIcon />
              <Text className="text-[20px] font-semibold text-[#c0d7f5]">Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              onPress={() => navigation.navigate('MediaLibrary')}>
              <MediaLibraryIcon width={16} height={16} />
              <Text className="text-[20px] font-semibold text-[#005AD0]">Media Library</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <HistoryIcon width={16} height={16} />
              <Text className="max-h-[43px] text-[20px] font-semibold text-[#005AD0]">History</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <AccountIcon width={16} height={16} />
              <Text className="text-[20px] font-semibold text-[#005AD0]">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <FindProIcon />
              <Text className="text-[20px] font-semibold text-[#c0d7f5]">Find a pro</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <AboutIcon />
              <Text className="text-[20px] font-semibold text-[#c0d7f5]">About</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <HelpIcon />
              <Text className="text-[20px] font-semibold text-[#c0d7f5]">Help</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3" onPress={() => logout()}>
              <LogoutIcon />
              <Text className="text-[20px] font-semibold text-[#005AD0]">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default Drawer;
