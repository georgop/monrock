import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LocationMarker } from 'mocks/types';

interface MarkerModalProps {
  visible: boolean;
  onClose: () => void;
  marker: LocationMarker | null;
}

export const MarkerModal: React.FC<MarkerModalProps> = ({ visible, onClose, marker }) => {
  if (!marker) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-gray-200 opacity-60" />
      </TouchableWithoutFeedback>

      <View
        style={{
          height: '60%',
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 16,
        }}>
        <Text className="mb-2 text-2xl font-bold">{marker.viewsPerDay}</Text>
        <Text>{marker.availableMonitors}</Text>
        <TouchableOpacity onPress={onClose} className="mt-4 rounded bg-blue-600 p-2">
          <Text className="text-center font-bold text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
