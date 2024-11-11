import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { Animated, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Drawer from './Home/Drawer';
import { useState } from 'react';

export type ScreenHeaderProps = {
  label: string;
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ label }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <View className="z-[100] mx-4 flex h-[64px] flex-row items-center justify-between">
        <TouchableOpacity onPress={toggleDrawer} className="flex w-20 items-center">
          <HamburgerIcon />
        </TouchableOpacity>
        <Text className="text-[22px] font-semibold">{label}</Text>
        <View className="w-20" />
      </View>
      {drawerOpen && (
        <Drawer animation={animation} isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      )}
    </>
  );
};
