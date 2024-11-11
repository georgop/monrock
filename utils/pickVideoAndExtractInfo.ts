import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import uuid from 'react-native-uuid';


export type VideoInfo = {
  id:string;
  dateAdded: string;
  fileName: string;
  thumbnailUri: string;
  duration: number; // in seconds
  size: number; // in bytes
  resolution: {
    width: number;
    height: number;
  };
  uri:string;
  isApproved:boolean;
};

export async function pickVideoAndExtractInfo(): Promise<VideoInfo | null> {
  // Request permission to access media library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permission to access media library is required!");
    return null;
  }

  // Open video picker
  const videoResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  });

  // Check if user canceled the picker
  if (videoResult.canceled) {
    return null;
  }

  // Get the video file URI
  const videoUri = videoResult.assets[0].uri;

  // Fetch video metadata (duration, width, height)
  const { width, height } = await getVideoMetadata(videoUri);

  // Get the file size using FileSystem API
  const fileInfo = await FileSystem.getInfoAsync(videoUri);

  // Generate thumbnail
  const thumbnailUri = await generateThumbnail(videoUri);

  const duration = await getDuration(videoUri);

  const size = await getVideoSizeInMB(videoUri);
  const date = new Date();

  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} at ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const fileName = videoUri.split('/').pop() || 'Unknown';

  const id = uuid.v4().toString();

  return {
    id,
    fileName,
    dateAdded: formattedDate,
    thumbnailUri,
    duration,
    size,
    resolution: { width, height },
    uri:videoUri,
    isApproved:Math.random() > 0.5
  };
}

async function getVideoMetadata(uri: string): Promise<{
  width: number;
  height: number;
}> {


  return new Promise(async (resolve, reject) => {
    try {
      // Generate a video thumbnail to extract metadata (duration and resolution)
      const { width, height } = await VideoThumbnails.getThumbnailAsync(uri, { time: 0 });
      resolve({ width, height }); // Convert ms to seconds
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDuration(uri: string): Promise<number> {
  const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      const status = await soundObject.getStatusAsync();

      // Check if the status is successful
      if (status.isLoaded) {
        const duration = status.durationMillis ? status.durationMillis / 1000 : 0; // Convert to seconds
        const fileInfo = await FileSystem.getInfoAsync(uri);
        return duration;
        
      } else {
        console.error('Error: Unable to load video status.');
        return 0;
      }
    } catch (error) {
      console.error('Error loading video', error);
      return 0;
    } finally {
      await soundObject.unloadAsync();
    };
}

async function getVideoSizeInMB(videoUri: string): Promise<number> {
  try {
    // Get the file size using FileSystem API
    const fileInfo = await FileSystem.getInfoAsync(videoUri);
    const sizeInBytes = fileInfo.exists ? fileInfo.size :  0; // size in bytes

    // Convert bytes to megabytes
    const sizeInMB = sizeInBytes / (1024 * 1024);

    return parseFloat(sizeInMB.toFixed(2));
  } catch (error) {
    console.error('Error getting video size:', error);
    throw error;
  }
}


async function generateThumbnail(uri: string): Promise<string> {
  try {
    const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(uri, { time: 1000 });
    return thumbnailUri;
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw error;
  }
}
