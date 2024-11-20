import { ResizeMode, Video } from 'expo-av';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You may need to install this package

export type VideoPlayerProps = {
  videoUri: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUri, isOpen, setIsOpen }) => {
  return (
    <Modal visible={isOpen} animationType="slide" transparent statusBarTranslucent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsOpen(false)}>
          <Ionicons name="close" size={36} color="white" />
        </TouchableOpacity>

        <Video
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls
          isLooping
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          onError={(e) => console.error('Video playback error', e)}
        />
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark background for better focus
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  video: {
    width: '90%',
    height: '90%',
  },
});
