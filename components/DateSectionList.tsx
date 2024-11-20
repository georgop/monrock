import React, { useEffect, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CheckedCheckbox } from 'assets/svg/CheckedCheckbox';
import { EmptyCheckbox } from 'assets/svg/EmptyCheckbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SectionData = {
  title: string;
  data: any[];
};

const generateDateSections = (): SectionData[] => {
  const sections: SectionData[] = [];
  const today = new Date();
  const endDate = addDays(today, 180);

  let currentDate = today;
  while (currentDate <= endDate) {
    const start = currentDate > startOfMonth(currentDate) ? currentDate : startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start, end });

    const monthName = format(currentDate, 'MMMM yyyy');
    sections.push({
      title: monthName,
      data: daysInMonth, // Keep as Date objects
    });

    currentDate = addDays(end, 1);
  }

  return sections;
};

export type DateSectionListProps = {
  setIsOpen: (value: boolean) => void;
};

export const DateSectionList: React.FC<DateSectionListProps> = ({ setIsOpen }) => {
  const sections = generateDateSections();
  const [selectedDates, setSelectedDates] = useState<Record<string, { price: number }>>({});

  const [selectedMonitor, setSelectedMonitor] = useState<any>();

  useEffect(() => {
    const loadSelectedMonitor = async () => {
      try {
        const storedMonitor = await AsyncStorage.getItem('selectedMonitor');
        if (storedMonitor) {
          setSelectedMonitor(JSON.parse(storedMonitor));
        }
      } catch (error) {
        console.error('Failed to load monitor from AsyncStorage', error);
      }
    };

    loadSelectedMonitor();
  }, []);

  useEffect(() => {
    const loadSelectedDates = async () => {
      try {
        const storedDates = await AsyncStorage.getItem('selectedDates');
        if (storedDates) {
          setSelectedDates(JSON.parse(storedDates));
        }
      } catch (error) {
        console.error('Failed to load selected dates from AsyncStorage', error);
      }
    };

    loadSelectedDates();
  }, []);

  const toggleDateSelection = async (date: string, price: number) => {
    const newSelections = { ...selectedDates };

    if (newSelections[date]) {
      delete newSelections[date]; // Unselect date
    } else {
      newSelections[date] = { price }; // Select date
    }

    setSelectedDates(newSelections);

    try {
      await AsyncStorage.setItem('selectedDates', JSON.stringify(newSelections));
    } catch (error) {
      console.error('Failed to save selected dates to AsyncStorage', error);
    }
  };

  if (!selectedMonitor) return null;

  return (
    <View className="mt-12 flex flex-1 bg-white p-4">
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
          const dateStr = format(new Date(item), 'yyyy-MM-dd');
          const day = format(new Date(item), 'EEE');
          const dayNumber = format(new Date(item), 'dd');

          // Price based on weekday or weekend
          const price = day === 'Sat' || day === 'Sun' ? 15 : 5;

          const isSelected = !!selectedDates[dateStr];
          const bookedAdSpaces = selectedMonitor.monitorSchedule[index].bookedAdSpaces;
          const totalAdSpaces = selectedMonitor.monitor.totalAdSpaces;

          const backgroundColor =
            totalAdSpaces - bookedAdSpaces === 0
              ? '#ABB8BD20'
              : totalAdSpaces - bookedAdSpaces < totalAdSpaces / 2
                ? '#FF990020'
                : '#005AD020';

          return (
            <TouchableOpacity
              className="my-2 flex flex-row items-center justify-between rounded-[16px] border-[1px] border-gray-200 p-4"
              style={{ backgroundColor: backgroundColor }}
              onPress={() => toggleDateSelection(dateStr, price)}>
              <View className="mt-2 flex flex-row items-center">
                <Text className="text-[36px] font-semibold leading-[48px] text-[#02326F]">
                  {dayNumber} <Text className="text-[28px]">{day}</Text>
                </Text>
                <View className="ml-4">
                  <Text className="font-semibold">
                    {totalAdSpaces - bookedAdSpaces} out of {totalAdSpaces} available spots
                  </Text>
                  <Text className="font-semibold">{price.toFixed(2)} € / per second</Text>
                </View>
              </View>
              {isSelected ? <CheckedCheckbox /> : <EmptyCheckbox />}
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-white px-4 py-2">
            <Text className="text-[22px] font-bold text-gray-900">{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />

      <TouchableOpacity
        className="my-6 h-12 w-40 items-center justify-center self-center rounded-full border border-[#005AD0] bg-[#005AD0]"
        onPress={() => {
          setIsOpen(false);
        }}>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-lg font-semibold text-white">Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
