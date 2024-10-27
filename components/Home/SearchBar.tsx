import { useNavigation } from '@react-navigation/native';
import { FiltersIcon } from 'assets/svg/FiltersIcon';
import { HamburgerIcon } from 'assets/svg/HamburgerIcon';
import { SearchIcon } from 'assets/svg/SearchIcon';
import { TouchableOpacity, View, TextInput } from 'react-native';

export type SearchBarProps = {
  toggleDrawer: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ toggleDrawer }) => {
  const navigation = useNavigation();

  return (
    <View
      className="flex h-14 w-full flex-row items-center justify-between rounded-[28px] bg-white px-4"
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
      <TouchableOpacity>
        <FiltersIcon />
      </TouchableOpacity>
    </View>
  );
};
