import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import { CalendarIcon } from 'assets/svg/CalendarIcon';
import { FiltersIcon } from 'assets/svg/FiltersIcon';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { SearchIcon } from 'assets/svg/SearchIcon';

export type SearchBarProps = {
  toggleDrawer: () => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  toggleDrawer,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Toggle filter in selectedFilters array
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter)); // Remove filter if already selected
    } else {
      setSelectedFilters([...selectedFilters, filter]); // Add filter if not selected
    }
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
        <TouchableOpacity onPress={toggleDrawer}>
          <HamburgerIcon />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-2">
          <SearchIcon />
          <TextInput placeholder="Search Map" placeholderTextColor="#5B6876" />
        </View>
        <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
          <FiltersIcon />
        </TouchableOpacity>
      </View>

      {!filtersVisible && (
        <View
          className="relative z-[100] mt-3 flex h-12 w-full flex-row items-center justify-center rounded-[28px] bg-white px-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 4,
          }}>
          <Text className="text-[14px] font-semibold text-black">26 Aug 2024</Text>
          <TouchableOpacity
            className="absolute right-0 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
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
    </>
  );
};
