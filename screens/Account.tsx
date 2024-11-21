import { ChevronRightIcon } from 'assets/svg/ChevronRightIcon';
import { UserIcon } from 'assets/svg/UserIcon';
import { ScreenHeader } from 'components/ScreenHeader';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export const Account = () => {
  const [activeSection, setActiveSection] = useState('');

  const renderMenu = () => (
    <View className="mt-8 px-6">
      <TouchableOpacity
        onPress={() => setActiveSection('accountSettings')}
        className="mb-4 flex flex-row items-center justify-between rounded-lg  p-4">
        <Text className="text-[16px] font-[500]">Account Settings</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveSection('personalInfo')}
        className="mb-4 flex flex-row items-center justify-between rounded-lg p-4">
        <Text className="text-[16px] font-[500]">Personal Info</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveSection('billing')}
        className="flex flex-row items-center justify-between rounded-lg p-4">
        <Text className="text-[16px] font-[500]">Billing</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
    </View>
  );

  const renderAccountSettings = () => (
    <ScrollView className="mt-8 px-6">
      <Text className="mb-4 text-[20px] font-[600]">Account Settings</Text>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Language</Text>
        <Text className="mt-2 text-[14px] text-gray-600">English</Text>
      </View>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Dark Mode</Text>
        <Text className="mt-2 text-[14px] text-gray-600">Enabled</Text>
      </View>
      <View className="rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Notifications</Text>
        <Text className="mt-2 text-[14px] text-gray-600">Push, Email</Text>
      </View>
      <TouchableOpacity
        onPress={() => setActiveSection('')}
        className="mt-8 items-center rounded-lg bg-blue-500 p-4">
        <Text className="text-[16px] font-[500] text-white">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPersonalInfo = () => (
    <ScrollView className="mt-8 px-6">
      <Text className="mb-4 text-[20px] font-[600]">Personal Info</Text>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Username</Text>
        <Text className="mt-2 text-[14px] text-gray-600">uninazir88</Text>
      </View>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Name</Text>
        <Text className="mt-2 text-[14px] text-gray-600">Unir Nazlong</Text>
      </View>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Email</Text>
        <Text className="mt-2 text-[14px] text-gray-600">uninazir88@gmail.com</Text>
      </View>
      <View className="rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Registered</Text>
        <Text className="mt-2 text-[14px] text-gray-600">22-08-2024</Text>
      </View>
      <TouchableOpacity
        onPress={() => setActiveSection('')}
        className="mt-8 items-center rounded-lg bg-blue-500 p-4">
        <Text className="text-[16px] font-[500] text-white">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderBilling = () => (
    <ScrollView className="mt-8 px-6">
      <Text className="mb-4 text-[20px] font-[600]">Billing</Text>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[16px] font-[500]">Credit Card:</Text>
        <Text className="mt-2 text-[14px] text-gray-600">**** **** **** 4242</Text>
      </View>
      <Text className="mb-2 text-[16px] font-[500]">Recent Transactions:</Text>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[14px]">1. 4 Ad spaces - National museum - 1000€</Text>
        <Text className="text-[14px] text-gray-500">Nov 20, 2024</Text>
      </View>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[14px]">2. 50 Ad spaces - Acropolis cafe - 5500€</Text>
        <Text className="text-[14px] text-gray-500">Nov 15, 2024</Text>
      </View>
      <View className="mb-4 rounded-lg bg-gray-50 p-4 shadow-md">
        <Text className="text-[14px]">3. 9 Ad spaces - Blend street coffee house - 590€</Text>
        <Text className="text-[14px] text-gray-500">Nov 10, 2024</Text>
      </View>
      <TouchableOpacity
        onPress={() => setActiveSection('')}
        className="mt-8 items-center rounded-lg bg-blue-500 p-4">
        <Text className="text-[16px] font-[500] text-white">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader label={'Account'} />
      <View className="mt-6 flex items-center justify-center">
        <UserIcon />
      </View>
      {activeSection === '' && renderMenu()}
      {activeSection === 'accountSettings' && renderAccountSettings()}
      {activeSection === 'personalInfo' && renderPersonalInfo()}
      {activeSection === 'billing' && renderBilling()}
    </View>
  );
};
