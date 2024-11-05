import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

type VideoDetails = {
  uri: string;
  duration: number; // in seconds
  size: number; // in bytes
};

export const AddMedia = () => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  const pickVideo = async (): Promise<string | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required!');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    return !result.canceled ? result.assets[0].uri : null;
  };

  const getVideoDetails = async (uri: string): Promise<VideoDetails | null> => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      const status = await soundObject.getStatusAsync();

      // Check if the status is successful
      if (status.isLoaded) {
        const duration = status.durationMillis ? status.durationMillis / 1000 : 0; // Convert to seconds
        const fileInfo = await FileSystem.getInfoAsync(uri);

        return {
          uri,
          duration,
          size: 0, // File size in bytes
        };
      } else {
        console.error('Error: Unable to load video status.');
        return null;
      }
    } catch (error) {
      console.error('Error loading video', error);
      return null;
    } finally {
      await soundObject.unloadAsync();
    }
  };

  const handlePickVideo = async () => {
    const uri = await pickVideo();
    if (uri) {
      const details = await getVideoDetails(uri);
      setVideoDetails(details);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={handlePickVideo}>
        <Text>Pick a video</Text>
      </TouchableOpacity>
      {videoDetails && (
        <View style={{ marginTop: 20 }}>
          <Text>Duration: {videoDetails.duration.toFixed(2)} seconds</Text>
          <Text>Size: {(videoDetails.size / (1024 * 1024)).toFixed(2)} MB</Text>
        </View>
      )}
    </View>
  );
};
