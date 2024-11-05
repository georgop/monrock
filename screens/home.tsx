import { useState, useEffect } from 'react';
import { Animated, View, Text, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HomeTabs } from 'components/Home/HomeTabs';
import { SearchBar } from 'components/Home/SearchBar';
import { Drawer } from 'components/Home/Drawer';
import { MarkerIcon } from 'assets/svg/MarkerIcon';
import { advertisingSpots } from 'mocks/data';
import { MarkerModal } from 'components/Home/MarkerModal';
import { AdvertisingSpot } from 'mocks/types';

export const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const athensCenter = {
    latitude: 37.9838,
    longitude: 23.7275,
  };

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
  const [selectedMarker, setSelectedMarker] = useState<AdvertisingSpot>();

  const handleMarkerPress = (marker: AdvertisingSpot) => {
    setSelectedMarker(marker);
    setMarkerModal(true);
  };

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        customMapStyle={[
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'landscape',
            stylers: [{ visibility: 'off' }],
          },
        ]}
        initialRegion={{
          ...athensCenter,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {advertisingSpots
          .filter(
            (advertisingSpot) =>
              selectedFilters.length === 0 ||
              selectedFilters.includes(advertisingSpot.category.name)
          )
          .map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => handleMarkerPress(marker)}
              tracksViewChanges={false}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleMarkerPress(marker)}>
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
              </TouchableWithoutFeedback>
            </Marker>
          ))}
      </MapView>
      {markerModal && (
        <MarkerModal
          visible={markerModal}
          onClose={() => setMarkerModal(false)}
          marker={selectedMarker}
        />
      )}
      <Drawer animation={animation} isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <View className="absolute left-3 right-3 top-14 z-10">
        <SearchBar
          toggleDrawer={toggleDrawer}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </View>
      <View className="absolute bottom-14 left-5 right-5 z-10">
        <HomeTabs />
      </View>
    </View>
  );
};

export default Home;
