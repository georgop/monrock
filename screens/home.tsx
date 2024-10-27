import { useState } from 'react';
import { Animated, View } from 'react-native';
import MapView from 'react-native-maps';
import { HomeTabs } from 'components/Home/HomeTabs';
import { SearchBar } from 'components/Home/SearchBar';
import { Drawer } from 'components/Home/Drawer';

export const Home = () => {
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
    <View className="flex-1">
      <MapView style={{ flex: 1 }} />
      <Drawer animation={animation} isOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <View className="absolute left-3 right-3 top-14 z-10">
        <SearchBar toggleDrawer={toggleDrawer} />
      </View>
      <View className="absolute bottom-14 left-5 right-5 z-10">
        <HomeTabs />
      </View>
    </View>
  );
};

export default Home;
