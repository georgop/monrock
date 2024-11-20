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
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';

type TabsProps = StackNavigationProp<RootStackParamList>;

export type DrawerProps = {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
};

export const Drawer: React.FC<DrawerProps> = ({ drawerOpen, setDrawerOpen }) => {
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation<TabsProps>();
  const { logout } = useAuth();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: drawerOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [drawerOpen, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-1000, 0],
  });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDrawerOpen(false);
      animation.setValue(0);
    });
    return unsubscribe;
  }, [navigation, animation]);

  return (
    <>
      {drawerOpen && (
        <View
          className="absolute inset-0 z-20 h-full w-full bg-[#263e59] opacity-90"
          onTouchEnd={toggleDrawer}
        />
      )}
      <Animated.View
        className="absolute bottom-14 left-0 top-14 z-[25] w-[80%] rounded-br-[24px] rounded-tr-[24px] bg-white"
        style={{ transform: [{ translateX }] }}>
        <View className="flex flex-1 items-start">
          <TouchableOpacity
            className="flex h-[10%] w-full items-end justify-center px-6"
            onPress={toggleDrawer}>
            <ExitIcon />
          </TouchableOpacity>
          <View className="flex h-[20%] w-full items-center justify-center">
            <NavigationLogo />
          </View>
          <View className="flex h-[70%] w-full justify-around px-[50px] py-8">
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 100, right: 50 }}
              className="flex flex-row items-center gap-3"
              onPress={() => navigation.navigate('Home')}>
              <MapIcon />
              <Text className="text-[14px] font-semibold text-[#005AD0]">Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 100, right: 50 }}
              className="flex flex-row items-center gap-3"
              onPress={() => navigation.navigate('Scheduled')}>
              <ScheduledIcon width={16} height={16} />
              <Text className="text-[14px] font-semibold text-[#005AD0]">Scheduled playbacks</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <FavouritesIcon />
              <Text className="text-[14px] font-semibold text-[#c0d7f5]">Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              hitSlop={{ top: 10, bottom: 10, left: 100, right: 50 }}
              onPress={() => navigation.navigate('MediaLibrary')}>
              <MediaLibraryIcon width={16} height={16} />
              <Text className="text-[14px] font-semibold text-[#005AD0]">Media Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              hitSlop={{ top: 10, bottom: 10, left: 100, right: 50 }}
              onPress={() => navigation.navigate('History')}>
              <HistoryIcon width={16} height={16} />
              <Text className="text-[14px] font-semibold text-[#005AD0]">History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              hitSlop={{ top: 10, bottom: 10, left: 100, right: 50 }}
              onPress={() => navigation.navigate('Account')}>
              <AccountIcon width={16} height={16} />
              <Text className="text-[14px] font-semibold text-[#005AD0]">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <FindProIcon />
              <Text className="text-[14px] font-semibold text-[#c0d7f5]">Find a pro</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <AboutIcon />
              <Text className="text-[14px] font-semibold text-[#c0d7f5]">About</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center gap-3">
              <HelpIcon />
              <Text className="text-[14px] font-semibold text-[#c0d7f5]">Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center gap-3"
              onPress={logout}
              hitSlop={{ top: 10, bottom: 10, left: 100, right: 50 }}>
              <LogoutIcon />
              <Text className="text-[14px] font-semibold text-[#005AD0]">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default Drawer;
