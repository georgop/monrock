import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Modal, StyleSheet } from 'react-native';
import { CalendarIcon } from 'assets/svg/CalendarIcon';
import { FiltersIcon } from 'assets/svg/FiltersIcon';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

export type SearchBarProps = {
  toggleDrawer: () => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  setLocation: (location: { latitude: number; longitude: number }) => void;
  setCalendarOpen: (value: boolean) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  toggleDrawer,
  selectedFilters,
  setSelectedFilters,
  setLocation,
  setCalendarOpen,
}) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: { selected: boolean } }>({});

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleDateSelect = (day: string) => {
    setSelectedDates((prevDates: any) => ({
      ...prevDates,
      [day]: prevDates[day]
        ? undefined
        : {
            selected: true,
            selectedColor: '#005AD0',
            selectedTextColor: '#FFFFFF',
          },
    }));
  };

  // Group dates by month and sort days in each month
  const groupDatesByMonth = () => {
    const groupedDates: { [monthYear: string]: string[] } = {};

    Object.keys(selectedDates)
      .filter((date) => selectedDates[date]?.selected)
      .forEach((date) => {
        const monthYear = dayjs(date).format('MMM YYYY');
        if (!groupedDates[monthYear]) {
          groupedDates[monthYear] = [];
        }
        groupedDates[monthYear].push(dayjs(date).format('DD'));
      });

    Object.keys(groupedDates).forEach((monthYear) => {
      groupedDates[monthYear].sort((a, b) => parseInt(a) - parseInt(b));
    });

    return groupedDates;
  };

  const formatGroupedDates = () => {
    const groupedDates = groupDatesByMonth();
    return Object.entries(groupedDates)
      .map(([monthYear, days]) => {
        const formattedDays = days.join(', ');
        return `${formattedDays} ${monthYear}`;
      })
      .join(', ');
  };

  return (
    <>
      <View
        className="z-[100] flex h-14 w-full flex-row items-center justify-between rounded-[28px] bg-white px-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 4,
        }}>
        <TouchableOpacity
          onPress={toggleDrawer}
          className="absolute left-6"
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
          <HamburgerIcon />
        </TouchableOpacity>
        <View className="flex w-[100%] flex-row items-center gap-2">
          <GooglePlacesAutocomplete
            placeholder="Search map"
            query={{
              key: 'AIzaSyAbd_kICSJ0e69Cuajvh1rQrvqvIykSLFA',
              language: 'en',
            }}
            onPress={(data, details = null) => {
              if (details?.geometry)
                setLocation({
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                });
            }}
            fetchDetails={true}
            listViewDisplayed="auto"
            textInputProps={{}}
            onFail={(error) => console.error(error)}
            styles={{
              container: {
                flex: 1,
              },
              listView: {
                position: 'absolute',
                zIndex: 100000,
                backgroundColor: 'white',
                width: '100%',
                top: 46,
                left: 0,
                right: 0,
                flex: 1,
              },
              textInputContainer: {
                paddingHorizontal: 50,
              },
              textInput: {
                height: '100%',
                textAlign: 'center',
              },
              description: {
                flex: 1,
                fontSize: 16,
                color: 'black',
                width: 1000,
              },
            }}
            requestUrl={{
              url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
              useOnPlatform: 'web',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setFiltersVisible(!filtersVisible);
          }}
          className="absolute right-6"
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <FiltersIcon />
        </TouchableOpacity>
      </View>

      {!filtersVisible && (
        <View className="absolute top-[75px] mt-3 flex w-full items-center justify-center">
          <View className="absolute right-0">
            <TouchableOpacity
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
              onPress={(event) => {
                setCalendarOpen(true);
                setCalendarVisible(true);
              }}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 4,
              }}>
              <CalendarIcon width={24} height={24} color="#000000" />
            </TouchableOpacity>
          </View>
          {formatGroupedDates() && (
            <View
              className="absolute z-[-1] flex h-12 w-full flex-row items-center justify-center rounded-[28px] bg-white px-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 4,
              }}>
              <Text
                className="w-[80%] pr-4 text-center text-[14px] font-semibold text-black"
                numberOfLines={1}>
                {formatGroupedDates() || 'No dates selected'}
              </Text>
            </View>
          )}
        </View>
      )}

      {filtersVisible && (
        <View
          className="-mt-14 flex h-[150px] gap-4 rounded-[28px] bg-white"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <View className="mt-16 flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
              onPress={() => toggleFilter('Gas stations')}
              className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2"
              style={{
                backgroundColor: selectedFilters.includes('Gas stations') ? '#005AD0' : 'white',
              }}>
              <Text
                className="font-semibold"
                style={{ color: selectedFilters.includes('Gas stations') ? 'white' : '#005AD0' }}>
                Gas stations
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFilter('Clinics')}
              className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2"
              style={{
                backgroundColor: selectedFilters.includes('Clinics') ? '#005AD0' : 'white',
              }}>
              <Text
                className="font-semibold"
                style={{ color: selectedFilters.includes('Clinics') ? 'white' : '#005AD0' }}>
                Clinics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFilter('Cafes')}
              className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2"
              style={{
                backgroundColor: selectedFilters.includes('Cafes') ? '#005AD0' : 'white',
              }}>
              <Text
                className="font-semibold"
                style={{ color: selectedFilters.includes('Cafes') ? 'white' : '#005AD0' }}>
                Cafes
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
              onPress={() => toggleFilter('Restaurants')}
              className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2"
              style={{
                backgroundColor: selectedFilters.includes('Restaurants') ? '#005AD0' : 'white',
              }}>
              <Text
                className="font-semibold"
                style={{ color: selectedFilters.includes('Restaurants') ? 'white' : '#005AD0' }}>
                Restaurants
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFilter('Public spaces')}
              className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2"
              style={{
                backgroundColor: selectedFilters.includes('Public spaces') ? '#005AD0' : 'white',
              }}>
              <Text
                className="font-semibold"
                style={{ color: selectedFilters.includes('Public spaces') ? 'white' : '#005AD0' }}>
                Public spaces
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal visible={calendarVisible} animationType="none" transparent statusBarTranslucent={true}>
        <View style={styles.modalContainer}>
          <View className="rounded-[24px] bg-white">
            <Calendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              markedDates={selectedDates}
              minDate={dayjs().format('YYYY-MM-DD')}
              enableSwipeMonths
              style={{ borderRadius: 20, padding: 10, margin: 20 }}
            />
          </View>
          <View className="mt-4 flex flex-row gap-2">
            <TouchableOpacity
              className="flex-1 rounded-[16px] bg-[#005AD0] p-4"
              onPress={() => setSelectedDates({})}>
              <Text className="text-center font-semibold text-[#FFFFFF]">Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-[16px] bg-[#FFFFFF] p-4"
              onPress={() => {
                setCalendarVisible(false);
                setCalendarOpen(false);
              }}>
              <Text className="text-center font-semibold text-[#005AD0]">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 24,
  },
});
