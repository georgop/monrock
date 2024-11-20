import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { HomeTabs } from 'components/Home/HomeTabs';
import { SearchBar } from 'components/Home/SearchBar';
import { Drawer } from 'components/Home/Drawer';
import { MarkerIcon } from 'assets/svg/MarkerIcon';
import { advertisingSpots } from 'mocks/data';
import { MarkerModal } from 'components/Home/MarkerModal';
import { AdvertisingSpot } from 'mocks/types';

export const Map = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mapRef = useRef<MapView>(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [markerModal, setMarkerModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<AdvertisingSpot>();

  const handleMarkerPress = (marker: AdvertisingSpot) => {
    setSelectedMarker(marker);
    setMarkerModal(true);
  };

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [location, setLocation] = useState({
    latitude: 37.9838,
    longitude: 23.7275,
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [location]);

  useFocusEffect(
    useCallback(() => {
      setDrawerOpen(false); // Reset drawerOpen state on focus
    }, [])
  );

  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
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
          ...location,
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
              onPress={() => {
                if (!calendarOpen) handleMarkerPress(marker);
              }}
              tracksViewChanges={false}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
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
          marker={selectedMarker}
        />
      )}
      <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <View className="absolute left-3 right-3 top-14 z-10">
        <SearchBar
          toggleDrawer={toggleDrawer}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setLocation={setLocation}
          setCalendarOpen={setCalendarOpen}
        />
      </View>
      <View className="absolute bottom-14 left-5 right-5 z-10">
        <HomeTabs />
      </View>
    </View>
  );
};
