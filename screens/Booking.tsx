import { BackHandler, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BookingHeader } from 'components/Booking/BookingHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MonitorsCarousel } from 'components/Booking/MonitorsCarousel';
import { useEffect, useState } from 'react';
import { CreateVideoPlaylist } from 'components/Booking/CreateVideoPlaylist';
import { SetPlaybackDate } from 'components/Booking/SetPlaybackDate';
import { BookingOverview } from 'components/Booking/BookingOverview';

type BookingRouteParams = {
  advertisingSpotId: number;
};

export const Booking = () => {
  const route = useRoute<RouteProp<{ params: BookingRouteParams }, 'params'>>();
  const { advertisingSpotId } = route.params;

  const [currentState, setCurrentState] = useState<
    'select-monitor' | 'create-video-playlist' | 'set-playback-date' | 'complete-order'
  >('select-monitor');

  useEffect(() => {
    const handleBackPress = () => {
      if (currentState === 'select-monitor') {
        // If on the initial state, allow default back behavior to close the screen
        return false;
      }

      // Otherwise, navigate to the previous state
      if (currentState === 'create-video-playlist') {
        setCurrentState('select-monitor');
      } else if (currentState === 'set-playback-date') {
        setCurrentState('create-video-playlist');
      } else if (currentState === 'complete-order') {
        setCurrentState('set-playback-date');
      }

      return true; // Prevent the default behavior
    };

    // Add event listener for back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup event listener on component unmount
    return () => backHandler.remove();
  }, [currentState]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BookingHeader setCurrentState={setCurrentState} currentState={currentState} />
      {currentState === 'select-monitor' && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <MonitorsCarousel
            advertisingSpotId={advertisingSpotId}
            setCurrentState={setCurrentState}
          />
        </View>
      )}
      {currentState === 'create-video-playlist' && (
        <View>
          <CreateVideoPlaylist setCurrentState={setCurrentState} />
        </View>
      )}
      {currentState === 'set-playback-date' && (
        <View>
          <SetPlaybackDate setCurrentState={setCurrentState} />
        </View>
      )}
      {currentState === 'complete-order' && (
        <View>
          <BookingOverview setCurrentState={setCurrentState} />
        </View>
      )}
    </SafeAreaView>
  );
};
