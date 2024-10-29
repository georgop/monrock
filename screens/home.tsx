import { useState, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HomeTabs } from 'components/Home/HomeTabs';
import { SearchBar } from 'components/Home/SearchBar';
import { Drawer } from 'components/Home/Drawer';
import { MarkerIcon } from 'assets/svg/MarkerIcon';
import { locationMarkers } from 'mocks/data';
import { MarkerModal } from 'components/Home/MarkerModal';

export const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const athensCenter = {
    latitude: 37.9838,
    longitude: 23.7275,
  };

  const markers = locationMarkers;

  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setDrawerOpen(!drawerOpen);
  };

  const [markerModal, setMarkerModal] = useState(false);

  console.log('rerenders');

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...athensCenter,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            onPress={() => setMarkerModal(true)}
            tracksViewChanges={false}>
            <MarkerIcon
              width={49}
              height={52}
              color={
                marker.availability === 0
                  ? '#005AD0'
                  : marker.availability === 1
                    ? '#FF9900'
                    : '#ABB8BD'
              }
            />
          </Marker>
        ))}
      </MapView>
      {markerModal && (
        <MarkerModal
          visible={markerModal}
          onClose={() => setMarkerModal(false)}
          marker={markers[0]}
        />
      )}
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
