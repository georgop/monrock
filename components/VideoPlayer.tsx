import { ResizeMode, Video } from 'expo-av';
import { Modal, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type VideoPlayerProps = {
  videoUri: string;
};
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUri }) => {
  return (
    <Modal>
      <Video
        style={{
          width: '100%',
          height: '80%',
        }}
        source={{ uri: videoUri }}
        useNativeControls
        isLooping
        shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        onError={(e) => console.error('Video playback error', e)}
      />
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
        <Text style={{ color: '#02326F', fontWeight: 'bold' }}>Close Video</Text>
      </TouchableOpacity>
    </Modal>
  );
};
