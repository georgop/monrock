import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { Animated, Text, View } from 'react-native';
import Drawer from './Home/Drawer';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export type ScreenHeaderProps = {
  label: string;
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ label }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <View className="flex h-[64px] w-full flex-row items-center">
        <TouchableOpacity onPress={toggleDrawer} className="flex w-20 items-center">
          <HamburgerIcon />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-semibold">{label}</Text>
        <View className="w-20"></View>
      </View>
      <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};
