import { CalendarIcon } from 'assets/svg/CalendarIcon';
import { FiltersIcon } from 'assets/svg/FiltersIcon';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { SearchIcon } from 'assets/svg/SearchIcon';
import { useState } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';

export type SearchBarProps = {
  toggleDrawer: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ toggleDrawer }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <>
      <View
        className="z-[100] flex h-14 w-full flex-row items-center justify-between rounded-[28px] bg-white px-4"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 4,
        }}>
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
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
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 4,
          }}>
          <Text className="text-[14px] font-semibold text-black">26 Aug 2024</Text>
          <TouchableOpacity
            className="absolute right-0 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
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
            <TouchableOpacity className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2">
              <Text className="font-semibold text-[#005AD0]">Gas stations</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2">
              <Text className="font-semibold text-[#005AD0]">Clinics</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2">
              <Text className="font-semibold text-[#005AD0]">Cafes</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2">
              <Text className="font-semibold text-[#005AD0]">Restaurants</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-[28px] border-[1px] border-[#005AD0] bg-white px-2 py-2">
              <Text className="font-semibold text-[#005AD0]">Public spaces</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
